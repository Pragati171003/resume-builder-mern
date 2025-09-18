import express from 'express';
import cors from 'cors';
import { render } from 'resumed';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
app.use(cors());
app.use(express.json({ limit: '5mb' }));

const PORT = 4000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.post('/render', async (req, res) => {
  const { resume, theme: themeName } = req.body;
  if (!resume || !themeName) return res.status(400).send({ error: 'Missing data.' });

  try {
    const theme = await import(`jsonresume-theme-${themeName}`);
    try {
      let html = await render(resume, theme.default);
      if (resume.meta && resume.meta.css) {
      console.log(`Injecting magnificent CSS for theme '${themeName}'...`);
      const cssFix = `
        <style>
          ${resume.meta.css}
        </style>
      `;
      html = html.replace('</head>', `${cssFix}</head>`);
    }
    res.send(html);
      res.send(html); 
    } catch (renderError) {
      console.error(`Error rendering the theme '${themeName}':`, renderError.message);
      res.status(500).send(`
        <div style="font-family:sans-serif;padding:40px;text-align:center;color:#d9534f;">
          <h2>Oops! This theme is not compatible.</h2>
          <p>The '${themeName}' theme could not be rendered. It might be an older theme or have a bug.</p>
          <p>Please try selecting another magnificent theme!</p>
        </div>
      `);
    }

  } catch (importError) {
    console.error(`Could not import theme 'jsonresume-theme-${themeName}':`, importError);
    res.status(500).send({ error: `Failed to find theme. Please run: npm install jsonresume-theme-${themeName}` });
  }
});

app.listen(PORT, () => {
  console.log(`Resume Rendering Server is running on http://localhost:${PORT}`);
});