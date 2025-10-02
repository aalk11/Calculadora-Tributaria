import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Cadastro() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password === confirmPassword) {
      alert("Cadastro bem-sucedido! Faça o login para prosseguir.");
      return;
    }
    else {
      alert("As senhas não coincidem!");
      return;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-8 bg-white rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Cadastro
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Campo Nome */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Nome
            </label>
            <input
              type="text"
              placeholder="Digite seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

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

          {/* Campo Senha */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Senha
            </label>
            <input
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* Confirmar Senha */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Confirmar Senha
            </label>
            <input
              type="password"
              placeholder="Confirme sua senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* Botão Cadastrar */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-xl hover:bg-green-700 transition">
            Cadastrar
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Já tem conta?{" "}
          <a href="/" className="text-blue-600 hover:underline">
            Faça login
          </a>
        </p>
      </div>
      <h2 className="block mb-2 text-sm font-medium text-gray-700">Desenvolvido por: Imãos Metralha</h2>
    </div>
  );
}