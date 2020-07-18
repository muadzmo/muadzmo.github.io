let dbPromised = idb.open("favTeam", 1, (upgradeDb) => {
    let teamsObjectStore = upgradeDb.createObjectStore("teams", {
      keyPath: "id"
    });
    teamsObjectStore.createIndex("shortName", "shortName", { unique: false });
  });

  const getAll = () =>{
    return new Promise((resolve, reject) => {
      dbPromised
        .then((db) => {
          let tx = db.transaction("teams", "readonly");
          let store = tx.objectStore("teams");
          return store.getAll();
        })
        .then((team) => {
          resolve(team);       
        });
    });
  };
  
  const saveForLater = (team) => {
    dbPromised
    .then((db) => {
      let tx = db.transaction("teams", "readwrite");
      let store = tx.objectStore("teams");
      store.put(team);
      return tx.complete;
    })
    .then(() => {
      M.toast({html: 'Tim favorit berhasil ditambahkan'})
      console.log("Artikel berhasil disimpan.");
    }).catch(()=>{
      M.toast({html: 'Tim favorit sudah ada'})
      console.log("Artikel gagal disimpan.");
    })
  };
  
  const cancelForLater = (team) => {
    dbPromised
    .then((db) => {
      let tx = db.transaction("teams", "readwrite");
      let store = tx.objectStore("teams");
      store.delete(team.id);
      return tx.complete;
    })
    .then(() => {
      M.toast({html: 'Tim favorit berhasil dihapus'})
      console.log("Artikel berhasil dihapus.");
    });
  };