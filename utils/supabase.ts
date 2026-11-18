// NEURAVAN - Supabase Client & Dynamic Data Synchronization Layer
// Reads credentials dynamically from environment variables (.env.local)

export const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://bpcookraynpvgthodsda.supabase.co";

export const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "sb_publishable_j7gtVXFmB7JnCoKZCBdQLw_BtRGuoGE";

export interface SupabaseResponse<T> {
  data: T | null;
  error: { message: string; code?: string; details?: string } | null;
  status: number;
}

/**
 * Standard fetch options with Supabase auth headers
 */
function getHeaders(extraHeaders: Record<string, string> = {}) {
  return {
    apikey: SUPABASE_ANON_KEY,
    Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    "Content-Type": "application/json",
    Accept: "application/json",
    ...extraHeaders,
  };
}

/**
 * Lightweight, zero-dependency Supabase client using PostgREST HTTP protocol.
 * Supports select, insert, update, upsert, and delete operations.
 */
class QueryBuilder<T = any> {
  private table: string;
  private endpoint: string;
  private method: string = "GET";
  private queryParams: URLSearchParams = new URLSearchParams();
  private bodyData: any = null;
  private headers: Record<string, string> = {};
  private isSingle: boolean = false;

  constructor(table: string) {
    this.table = table;
    const base = SUPABASE_URL.replace(/\/+$/, "");
    this.endpoint = `${base}/rest/v1/${table}`;
  }

  select(columns: string = "*") {
    this.method = "GET";
    this.queryParams.set("select", columns);
    return this;
  }

  eq(column: string, value: any) {
    this.queryParams.set(column, `eq.${value}`);
    return this;
  }

  neq(column: string, value: any) {
    this.queryParams.set(column, `neq.${value}`);
    return this;
  }

  order(column: string, options: { ascending?: boolean } = { ascending: true }) {
    this.queryParams.set("order", `${column}.${options.ascending ? "asc" : "desc"}`);
    return this;
  }

  limit(count: number) {
    this.queryParams.set("limit", count.toString());
    return this;
  }

  single() {
    this.isSingle = true;
    this.headers["Accept"] = "application/vnd.pgrst.object+json";
    return this;
  }

  insert(values: any | any[]) {
    this.method = "POST";
    this.bodyData = values;
    this.headers["Prefer"] = "return=representation";
    return this;
  }

  upsert(values: any | any[], onConflict?: string) {
    this.method = "POST";
    this.bodyData = values;
    const prefer = onConflict
      ? `resolution=merge-duplicates,return=representation`
      : `resolution=merge-duplicates,return=representation`;
    this.headers["Prefer"] = prefer;
    return this;
  }

  update(values: any) {
    this.method = "PATCH";
    this.bodyData = values;
    this.headers["Prefer"] = "return=representation";
    return this;
  }

  delete() {
    this.method = "DELETE";
    this.headers["Prefer"] = "return=representation";
    return this;
  }

  async then<TResult1 = SupabaseResponse<T>, TResult2 = never>(
    onfulfilled?: ((value: SupabaseResponse<T>) => TResult1 | PromiseLike<TResult1>) | null,
    onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null
  ): Promise<TResult1 | TResult2> {
    const queryString = this.queryParams.toString();
    const url = queryString ? `${this.endpoint}?${queryString}` : this.endpoint;

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);

      const res = await fetch(url, {
        method: this.method,
        headers: getHeaders(this.headers),
        body: this.bodyData ? JSON.stringify(this.bodyData) : undefined,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const status = res.status;
      if (!res.ok) {
        let errJson: any = null;
        try {
          errJson = await res.json();
        } catch {
          errJson = { message: res.statusText };
        }
        const errorResult: SupabaseResponse<T> = {
          data: null,
          error: {
            message: errJson.message || `Supabase error (${status}): ${res.statusText}`,
            code: errJson.code || status.toString(),
            details: errJson.details || errJson.hint || undefined,
          },
          status,
        };
        return (onfulfilled ? onfulfilled(errorResult) : errorResult) as any;
      }

      let data: any = null;
      if (status !== 204) {
        const text = await res.text();
        if (text) {
          try {
            data = JSON.parse(text);
          } catch {
            data = text;
          }
        }
      }

      const successResult: SupabaseResponse<T> = {
        data,
        error: null,
        status,
      };

      return (onfulfilled ? onfulfilled(successResult) : successResult) as any;
    } catch (err: any) {
      const errorResult: SupabaseResponse<T> = {
        data: null,
        error: {
          message: err.name === "AbortError" ? "Supabase request timed out" : err.message || "Network error",
          code: err.name || "NETWORK_ERROR",
        },
        status: 0,
      };
      if (onfulfilled) {
        return onfulfilled(errorResult);
      }
      if (onrejected) {
        return onrejected(err);
      }
      return errorResult as any;
    }
  }
}

/**
 * Standard Supabase client object
 */
export const supabase = {
  from: <T = any>(table: string) => new QueryBuilder<T>(table),
};

/**
 * Health check to verify Supabase connectivity
 */
export async function checkSupabaseHealth(): Promise<{
  ok: boolean;
  status: number;
  message: string;
  latencyMs: number;
}> {
  const start = Date.now();
  try {
    const res = await fetch(`${SUPABASE_URL.replace(/\/+$/, "")}/rest/v1/`, {
      method: "GET",
      headers: getHeaders(),
    });
    const latencyMs = Date.now() - start;
    return {
      ok: res.ok,
      status: res.status,
      message: res.ok
        ? "Connected successfully to Supabase"
        : `Supabase returned HTTP ${res.status}: ${res.statusText}`,
      latencyMs,
    };
  } catch (err: any) {
    return {
      ok: false,
      status: 0,
      message: err.message || "Cannot connect to Supabase (network offline or blocked)",
      latencyMs: Date.now() - start,
    };
  }
}

/**
 * Newsletter subscriber insertion helper
 */
export async function insertNewsletterSubscriber(email: string, language: string = "en") {
  const payload = {
    email,
    language,
    subscribed_at: new Date().toISOString(),
  };

  const res = await supabase.from("newsletter_subscribers").insert(payload);
  return res;
}
