export default function Dashboard() {
  return (
    <>
      <table className="border border-blue-600 table-auto">
        <thead>
          <tr>
            <th className="border px-4 py-2"></th>
            <th className="border px-4 py-2">Lunes</th>
            <th className="border px-4 py-2">Martes</th>
            <th className="border px-4 py-2">Miércoles</th>
            <th className="border px-4 py-2">Jueves</th>
            <th className="border px-4 py-2">Viernes</th>
          </tr>
        </thead>
        <tbody>
          {[...Array(5)].map((_, i) => (
            <tr key={i}>
              <td className="border px-4 py-2">{i + 1}</td>
              <td className="border px-4 py-2"></td>
              <td className="border px-4 py-2"></td>
              <td className="border px-4 py-2"></td>
              <td className="border px-4 py-2"></td>
              <td className="border px-4 py-2"></td>
            </tr>
          ))}
        </tbody>
      </table>

      <table className="table-auto">
        <thead>
          <tr>
            <th className="border px-4 py-2">Nombre</th>
            <th className="border px-4 py-2">Descripción</th>
            <th className="border px-4 py-2">Materia</th>
            <th className="border px-4 py-2">Entrega</th>
            <th className="border px-4 py-2">Archivo</th>
            <th className="border px-4 py-2">✅</th>
            <th className="border px-4 py-2">Valor</th>
            <th className="border px-4 py-2">Nota</th>
          </tr>
        </thead>
        <tbody>
          {[...Array(6)].map((_, i) => (
            <tr key={i}>
              {[...Array(8)].map((_, j) => (
                <td key={j} className="border px-4 py-2"></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
