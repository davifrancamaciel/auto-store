import app from './app';
const PORT = process.env.APP_PORT;
app.listen(PORT, () => {
  console.log(`Backend gestão flex rodando na porta ${PORT}`);
});
