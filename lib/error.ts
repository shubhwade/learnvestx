export function devErrorResponse(message: string, error?: any) {
  // In development include the error details to aid debugging
  if (process.env.NODE_ENV !== "production") {
    return { error: message, details: (error && (error.message || String(error))) || null };
  }
  return { error: message };
}

export function logError(ctx: string, error: any) {
  try {
    console.error(`${ctx} error:`, error);
  } catch (e) {
    // swallow
  }
}
