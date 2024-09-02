const getMenuFrontEnd = (role = "USER_ROLE") => {
  const menu = [
    {
      titulo: "Dashboard",
      icono: "mdi mdi-gauge",
      submenu: [
        { titulo: "Main", url: "/" },
        { titulo: "Rxjs", url: "rxjs" },
      ],
    },
    {
      titulo: "Mantenimientos",
      icono: "mdi mdi-folder-lock-open",
      submenu: [
        { titulo: "Usuarios", url: "usuarios" },
        { titulo: "Hospitales", url: "hospitales" },
        { titulo: "Medicos", url: "medicos" },
      ],
    },
  ];

  if (role === "USER_ROLE") {
    // delete menu[1].submenu[1];
    // menu[1].submenu.unshift({ titulo: "Usuarios", url: "usuarios" });
    menu[1].submenu = menu[1].submenu.filter(
      (item) => item.titulo !== "Usuarios"
    );
  }

  return menu;
};

module.exports = {
  getMenuFrontEnd,
};
