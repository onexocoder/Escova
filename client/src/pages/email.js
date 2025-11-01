import express from "express";
import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// 👇 vem do .env
const resend = new Resend(process.env.RESEND_API_KEY);
// 👇 e-mail que vai receber as encomendas
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "trocame@teuemail.pt";

router.post("/encomenda", async (req, res) => {
  const {
    nome,
    telefone,
    morada,
    codigoPostal,
    quantidade,
    emailCliente,
  } = req.body;

  try {
    // 1) e-mail pra TI
    await resend.emails.send({
      // troca se já tiver domínio verificado no Resend
      from: "PetBrush <onboarding@resend.dev>",
      to: ADMIN_EMAIL,
      subject: `📦 Nova encomenda - ${nome}`,
      html: `
        <h2>Nova encomenda</h2>
        <p><b>Nome:</b> ${nome}</p>
        <p><b>Telefone:</b> ${telefone}</p>
        <p><b>Email cliente:</b> ${emailCliente || "não informou"}</p>
        <p><b>Morada:</b> ${morada}</p>
        <p><b>Código Postal:</b> ${codigoPostal}</p>
        <p><b>Quantidade:</b> ${quantidade}</p>
      `,
    });

    // 2) e-mail pro cliente (só se ele informou)
    if (emailCliente) {
      await resend.emails.send({
        from: "PetBrush <onboarding@resend.dev>",
        to: emailCliente,
        subject: "Recebemos a tua encomenda 🐾",
        html: `
          <p>Olá ${nome},</p>
          <p>Recebemos a tua encomenda da <b>Escova 3 em 1 PetBrush™</b>.</p>
          <p>Em breve vamos contactar-te pelo número <b>${telefone}</b> para combinar a entrega.</p>
          <p><b>Entrega:</b> Pague na Entrega</p>
          <p><b>Morada:</b> ${morada} — ${codigoPostal}</p>
          <p>Obrigado 💙</p>
        `,
      });
    }

    return res.json({ ok: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ ok: false, message: "Erro ao enviar emails" });
  }
});

export default router;
