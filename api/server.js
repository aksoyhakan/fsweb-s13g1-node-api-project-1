// SUNUCUYU BU DOSYAYA KURUN
const express = require("express");
const User = require("./users/model");
const server = express();

server.use(express.json());

server.post("/api/users", (req, res) => {
  if (req.body.name && req.body.bio) {
    User.insert(req.body)
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((err) =>
        res
          .status(500)
          .json({ message: "Veritabanına kaydedilirken bir hata oluştu" })
      );
  } else {
    res
      .status(400)
      .json({ message: "Lütfen kullanıcı için bir name ve bio sağlayın" });
  }
});

server.get("/api/users", (req, res) => {
  User.find()
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) =>
      res.status(500).json({ message: "Kullanıcı bilgileri alınamadı" })
    );
});

server.get("/api/users/:id", (req, res) => {
  User.findById(req.params.id)
    .then((response) => {
      response
        ? res.status(200).json(response)
        : res
            .status(404)
            .json({ message: "Belirtilen ID'li kullanıcı bulunamadı" });
    })
    .catch((err) =>
      res.status(500).json({ message: "Kullanıcı bilgisi alınamadı" })
    );
});

server.delete("/api/users/:id", (req, res) => {
  User.remove(req.params.id)
    .then((response) => {
      response
        ? res.status(200).json(response)
        : res
            .status(404)
            .json({ message: "Belirtilen ID li kullanıcı bulunamadı" });
    })
    .catch((err) => res.status(500).json({ message: "Kullanıcı silinemedi" }));
});

server.put("/api/users/:id", (req, res) => {
  if (req.body.name && req.body.bio) {
    User.update(req.params.id, req.body)
      .then((response) => {
        response
          ? res.status(200).json(response)
          : res
              .status(404)
              .json({ message: "Belirtilen ID'li kullanıcı bulunamadı" });
      })
      .catch((err) =>
        res.status(500).json({ message: "Kullanıcı bilgileri güncellenemedi" })
      );
  } else {
    res
      .status(400)
      .json({ message: "Lütfen kullanıcı için name ve bio sağlayın" });
  }
});

module.exports = server; // SERVERINIZI EXPORT EDİN {}
