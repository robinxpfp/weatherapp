type ValuesProps = { texto: string; valor?: string };

export const Values = ({ texto, valor }: ValuesProps) => (
  <div className="flex justify-between items-center py-2 border-b border-gray-100 text-sm">
    <div>{texto}</div>
    <div>{valor ?? "..."}</div>
  </div>
);
