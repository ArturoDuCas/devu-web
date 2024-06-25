export function convertSnaps<T>(results: any): T[] {
  // @ts-ignore
  return results.docs.map(snap => {
    return {
      id: snap.id,
      ...snap.data()
    };
  }) as T[];
}
