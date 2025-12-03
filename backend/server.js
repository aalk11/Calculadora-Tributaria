import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'; // ← ADICIONE ESTA IMPORT
import mysql from 'mysql2/promise';
import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';

const app = express();
const PORT = 3000;
const SECRET_KEY = 'edead35592554922e00a96a11d756b962ea69d4c053ca12a26994ab5372781cf';

// Middleware
app.use(express.json());
app.use(
    cors({
        origin: 'http://localhost:5173', 
        credentials: true
    })
);

// Configuração do pool
const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Ra998122663r@.",
    database: "banco_viado",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// FUNÇÃO PARA INICIALIZAR O BANCO (CORRIGIDA)
async function inicializarBD() {
    let conexao;
    try {
        conexao = await pool.getConnection();
        console.log("✅ Conectado ao MySQL!");

        // Verifica qual database estamos usando
        const [dbInfo] = await conexao.execute("SELECT DATABASE() as current_db");
        console.log(`📁 Database atual: ${dbInfo[0].current_db}`);

        // Cria a tabela se não existir
        await conexao.execute(`
            CREATE TABLE IF NOT EXISTS usuarios (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nome VARCHAR(100) NOT NULL,
                email VARCHAR(100) NOT NULL UNIQUE,
                senha VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log("✅ Tabela 'usuarios' verificada/criada.");

        // Verifica se a tabela foi criada
        const [tabelas] = await conexao.execute("SHOW TABLES LIKE 'usuarios'");
        if (tabelas.length === 0) {
            throw new Error("Tabela 'usuarios' não foi criada!");
        }

        console.log("✅ Banco de dados inicializado com sucesso!");

    } catch (error) {
        console.error("❌ ERRO ao inicializar banco de dados:");
        console.error("Mensagem:", error.message);
        console.error("Código:", error.code);
        if (error.sql) console.error("SQL:", error.sql);
        if (error.sqlMessage) console.error("SQL Message:", error.sqlMessage);
    } finally {
        if (conexao) conexao.release();
    }
}

// INICIALIZA O BANCO ANTES DE RODAR O SERVIDOR
inicializarBD().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Servidor rodando na porta ${PORT}`);
    });
});

// Configuração do email
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'queiroz.caua.rj@gmail.com',
        pass: 'gaoi rztb ddhd xfnr'
    }
});

// ROTA: Envio de email
app.post('/send-email', async (req, res) => {
    const { nome, email, mensagem } = req.body;

    if (!nome || !email || !mensagem) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    const mailOptions = {
        from: 'queiroz.caua.rj@gmail.com',
        to: "umcarinha1702@gmail.com",
        subject: `[AJUDA NAF] Dúvida de: ${nome}`,
        text: `
            Nome do Usuário: ${nome}
            Email de Contato: ${email}
            -------------------------------------
            Mensagem:
            ${mensagem}
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`📧 Email enviado para ${mailOptions.to}`);
        return res.status(200).json({ message: 'Email enviado com sucesso!' });
    } catch (error) {
        console.error('ERRO AO ENVIAR EMAIL:', error);
        return res.status(500).json({ message: 'Erro interno ao tentar enviar o email.' });
    }
});

// REGISTRO DE USUARIO (CORRIGIDO)
app.post('/register', async (req, res) => {
    let conexao;
    try {
        const { nome, email, senha } = req.body;

        console.log("📝 Tentando registrar usuário:", { nome, email });

        // Validação básica
        if (!nome || !email || !senha) {
            return res.status(400).json({ message: "Todos os campos são obrigatórios." });
        }

        // Conecta ao banco
        conexao = await pool.getConnection();

        // 1. Verificar se o email já existe
        const [existingUsers] = await conexao.execute(
            "SELECT id FROM usuarios WHERE email = ?",
            [email]
        );

        if (existingUsers.length > 0) {
            return res.status(409).json({ message: "Email já registrado." });
        }

        // 2. Hash da senha (NUNCA armazene senhas em texto puro!)
        const saltRounds = 10;
        const senhaHash = await bcrypt.hash(senha, saltRounds);
        console.log("🔐 Senha hasheada com sucesso");

        // 3. Inserir novo usuário 
        const [result] = await conexao.execute(
            "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)",
            [nome, email, senhaHash] // ← Armazena o HASH, não a senha em texto
        );

        console.log(`✅ Usuário inserido com ID: ${result.insertId}`);

        // 4. Retornar sucesso
        return res.status(201).json({ 
            message: "Usuário registrado com sucesso!", 
            userId: result.insertId 
        });

    } catch (error) {
        console.error("❌ ERRO no registro:");
        console.error("Mensagem:", error.message);
        console.error("Código:", error.code);
        if (error.sql) console.error("SQL:", error.sql);
        if (error.sqlMessage) console.error("SQL Message:", error.sqlMessage);
        
        return res.status(500).json({ 
            message: "Erro interno no servidor",
            error: error.message 
        });
    } finally {
        if (conexao) conexao.release();
    }
});

// LOGIN USUARIO (CORRIGIDO)
app.post('/login', async (req, res) => {
    let conexao;
    try {
        const { email, senha } = req.body;

        console.log("🔑 Tentando login para:", email);

        // Validação
        if (!email || !senha) {
            return res.status(400).json({ message: "Email e senha são obrigatórios." });
        }

        // Conecta ao banco
        conexao = await pool.getConnection();

        // 1. Buscar usuário pelo email
        const [usuarios] = await conexao.execute(
            "SELECT * FROM usuarios WHERE email = ?",
            [email]
        );

        if (usuarios.length === 0) {
            console.log("❌ Usuário não encontrado:", email);
            return res.status(401).json({ message: "Credenciais inválidas." });
        }

        const usuario = usuarios[0];
        console.log(`👤 Usuário encontrado: ${usuario.nome} (ID: ${usuario.id})`);

        // 2. Verificar a senha (comparando com o hash)
        const senhaValida = await bcrypt.compare(senha, usuario.senha);
        
        if (!senhaValida) {
            console.log("❌ Senha incorreta para:", email);
            return res.status(401).json({ message: "Credenciais inválidas." });
        }

        // 3. Gerar token JWT
        const token = jwt.sign(
            { 
                id: usuario.id, 
                nome: usuario.nome, 
                email: usuario.email 
            },
            SECRET_KEY,
            { expiresIn: '1h' }
        );

        console.log("✅ Login bem-sucedido para:", usuario.email);

        return res.status(200).json({ 
            message: "Login bem-sucedido.",
            token: token,
            user: {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email
            }
        });

    } catch (error) {
        console.error('❌ ERRO no login:');
        console.error("Mensagem:", error.message);
        console.error("Código:", error.code);
        
        return res.status(500).json({ message: "Erro interno do servidor." });
    } finally {
        if (conexao) conexao.release();
    }
});

// middleware de autenticação
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token não fornecido.' });
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Token inválido.' });
        }
        req.user = user;
        next();
    });
};

// ROTA DE DEBUG (REMOVA EM PRODUÇÃO)
app.get('/debug/usuarios', authenticateToken, async (req, res) => {
    let conexao;
    try {
        conexao = await pool.getConnection();
        const [usuarios] = await conexao.execute("SELECT id, nome, email, created_at FROM usuarios");
        
        return res.status(200).json({
            total: usuarios.length,
            usuarios: usuarios
        });
    } catch (error) {
        console.error("Erro no debug:", error);
        return res.status(500).json({ error: error.message });
    } finally {
        if (conexao) conexao.release();
    }
});