export default function Home() {
  return (
    <main className="bg-yellow-300  h-screen w-screen flex justify-center items-center">
      <div className="w-[500px] drop-shadow-2xl bg-white rounded-md p-12 border border-gray-300">
        <h1 className="font-medium text-3xl text-center">¡Bienvenido a UniMaster!</h1>
        <div className="mt-4 text-sm text-gray-600">
          Crea tu cuenta para empezar a organizar rápidamente tu vida universitaria
        </div>
        <form className="space-y-6 mt-6">
          <div>
            <label>
              <span>Nombre</span>
              <input type="text" className="bg-gray-100 h-10 border mt-2 border-gray-300 rounded-md w-full "></input>
            </label>
          </div>
          <div>
            <label>
              <span>Email</span>
              <input type="email" className="bg-gray-100 h-10 border mt-2 border-gray-300 rounded-md w-full "></input>
            </label>
          </div>
          <div>
            <label>
              <span>Contraseña</span>
              <input
                type="password"
                className="bg-gray-100 h-10 border mt-2 border-gray-300 rounded-md w-full "
              ></input>
            </label>
          </div>

          <button className="w-full bg-yellow-300 p-3 rounded-full">Registrase</button>
        </form>
        <div className="mt-8 text-center">
          ¿Ya tienes una cuenta?{" "}
          <a className="text-blue-500" href="#">
            inicia sesión
          </a>
        </div>
      </div>
    </main>
  );
}
