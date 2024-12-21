export class TransformHelper {
  public static trim({ value }: { value: string }): string {
    return value ? value.trim() : value;
  }

  public static toLowerCase({ value }) {
    return value ? value.trim().toLowerCase() : value;
  }

  public static toUpperCase({ value }) {
    return value ? value.trim().toUpperCase() : value;
  }

  public static trimArray({ value }) {
    return value ? value.map((item) => item.trim()) : value;
  }

  public static uniqueItems({ value }) {
    return value ? Array.from(new Set(value)) : value;
  }
}
