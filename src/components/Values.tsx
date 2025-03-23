type ValuesProps = {
  texto: string;
  valor?: string;
};

export function Values({ texto, valor }: ValuesProps) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-gray-100">
      <div className="text-sm font-medium">{texto}</div>
      <div className="text-sm">{valor ?? "..."}</div>
    </div>
  );
}
