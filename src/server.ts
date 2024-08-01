import express from 'express';
import dataRoutes from './routes/dataRoutes';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', dataRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

export default app;  // Adicione esta linha para exportar o app
