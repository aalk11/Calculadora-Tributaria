import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer); 
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!email) {newErrors.email = "Por favor, preencha o campo de email.";}
    if (!password) {newErrors.password = "Por favor, preencha o campo de senha.";}

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setErrors({});

    if (email === "teste@teste.com" && password === "123456") {
      console.log("Login bem-sucedido!");
      navigate("/Home");
    } else {
      alert("Email ou senha inválidos!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-300">
      <h1
        className={`text-3xl font-bold text-center mb-6 text-gray-800 transition-all duration-700 ease-out delay-200
          ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"}`}
      >
        CALCULADORA DE IMPOSTO DE RENDA
      </h1>
      <div
        className={`w-full max-w-sm p-8 bg-white rounded-2xl shadow-lg transition-all duration-700 ease-out delay-300
          ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        <h2 className={`text-2xl font-bold text-center mb-6 text-gray-800 transition-all duration-500 ease-out delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          {/* EMAIL */}
          <div className={`transition-all duration-500 ease-out delay-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition delay-100 duration-500 ease-in-out hover:-translate-y-1 hover:scale-102"
            />
            {errors.email && (
              <p className={`mt-1 text-sm text-red-600 transition-all duration-1000 ease-out delay-1350 ${isVisible ? "opacity-100" : "opacity-0"}`}
              >{errors.email}</p>
            )}
          </div>

          {/* SENHA */}
          <div className={`transition-all duration-500 ease-out delay-850 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Senha
            </label>
            <input
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition delay-100 duration-500 ease-in-out hover:-translate-y-1 hover:scale-102"
            />
            {errors.password && (
              <p className={`mt-1 text-sm text-red-600 transition-all duration-1000 ease-out delay-1350 ${isVisible ? "opacity-100" : "opacity-0"}`} > {errors.password}</p>
            )}
          </div>

          {/* BOTÃO DE ENTRAR */}
          <div className={`transition-all duration-500 ease-out delay-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition duration-300 ease-in-out hover:scale-102"
            >
              Entrar
            </button>
          </div>
        </form>

        <p className={`text-center text-sm text-gray-600 mt-4 transition-all duration-500 ease-out delay-1150 ${isVisible ? "opacity-100" : "opacity-0"}`}>
          Não tem conta?{" "}
          <a href="/Cadastro" className="text-blue-600 hover:underline">
            Cadastre-se
          </a>
        </p>

        <p className={`text-center text-sm text-gray-600 mt-4 transition-all duration-500 ease-out delay-1250 ${isVisible ? "opacity-100" : "opacity-0"}`}>
          Esqueceu a senha?{" "}
          <a href="/RecuperarSenha" className="text-blue-600 hover:underline">
            Recuperar Senha
          </a>
        </p>
      </div>
      <h2 className={`block mb-2 text-sm font-medium text-gray-700 p-1 transition-all duration-1000 ease-out delay-1350 ${isVisible ? "opacity-100" : "opacity-0"}`}>
        Desenvolvido por: Imãos Metralha
      </h2>
    </div>
  );
}

