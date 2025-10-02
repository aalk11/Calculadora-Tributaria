import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "teste@teste.com" && password === "123456") {
      console.log("Login bem-sucedido!");
      navigate("/Home"); 
    } else {
      alert("Email ou senha inválidos!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        CALCULADORA DE IMPOSTO DE RENDA
        </h1>
      <div className="w-full max-w-sm p-8 bg-white rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
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

          {/* Senha */}
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

          {/* Entrar */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
            href="/Cadastro"
          >
            Entrar
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Não tem conta?{" "}
          <a href="/Cadastro" className="text-blue-600 hover:underline">
            Cadastre-se
          </a>
        </p>

        <p className="text-center text-sm text-gray-600 mt-4">
          Esqueceu a senha?{" "}
          <a href="/RecuperarSenha" className="text-blue-600 hover:underline">
            Recuperar Senha
          </a>
        </p>
      </div>
      <h2 className="block mb-2 text-sm font-medium text-gray-700">Desenvolvido por: Imãos Metralha</h2>
    </div>
    
  );
}