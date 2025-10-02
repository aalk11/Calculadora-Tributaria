import { useState } from "react";

export default function RecuperarSenha() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Recuperação solicitada para:", email);
    alert("Se este email estiver cadastrado, enviaremos instruções de recuperação.");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-8 bg-white rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Recuperar Senha
        </h2>
        <p className="text-center text-sm text-gray-600 mb-6">
          Informe seu email e enviaremos as instruções para redefinir sua senha.
        </p>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Campo Email */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* Botão Enviar */}
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-xl hover:bg-purple-700 transition"
          >
            Enviar
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Lembrou sua senha?{" "}
          <a href="/" className="text-blue-600 hover:underline">
            Faça login
          </a>
        </p>
      </div>
    </div>
  );
}
