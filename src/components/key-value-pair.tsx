type ValuesProps = { texto: string; valor?: string };

export function KeyValuePair({ texto, valor }: ValuesProps) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-gray-100 text-sm">
      <div>{texto}</div>
      <div>{valor ?? "..."}</div>
    </div>
  );
}
