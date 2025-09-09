// controller/templatecontroller.js

const templates = [
  {
    id: 1,
    name: "Modern Resume",
    formats: ["pdf", "docx"],
    previewUrl: "/templates/modern",   // frontend can open this
  },
  {
    id: 2,
    name: "Classic Resume",
    formats: ["pdf", "docx", "txt"],
    previewUrl: "/templates/classic",
  },
  {
    id: 3,
    name: "Creative Resume",
    formats: ["pdf"],
    previewUrl: "/templates/creative",
  },
];

// Get all templates
const getTemplates = (req, res) => {
  res.json(templates);
};

// Select one template by ID
const selectTemplate = (req, res) => {
  const { templateId } = req.body;
  const selected = templates.find((t) => t.id === templateId);

  if (!selected) {
    return res.status(404).json({ message: "❌ Template not found" });
  }

  res.json({
    message: "✅ Template selected",
    template: selected,
  });
};

module.exports = { getTemplates, selectTemplate };
