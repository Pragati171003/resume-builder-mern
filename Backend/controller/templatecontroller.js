const getTemplates = (req, res) => {
  res.json([
    { id: 1, name: "Modern Resume" },
    { id: 2, name: "Classic Resume" },
    { id: 3, name: "Creative Resume" },
  ]);
};

module.exports = { getTemplates };
