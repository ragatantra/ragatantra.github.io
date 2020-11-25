var dbPromised = idb.open("football", 1, function (upgradeDb) {
    var teamsObjectStore = upgradeDb.createObjectStore("teams", {
        keyPath: "id"
    });
    teamsObjectStore.createIndex("id_team", "id", {
        unique: false
    });
});

function saveForLater(dbteam) {
    dbPromised
        .then(function (db) {
            var tx = db.transaction("teams", "readwrite");
            var store = tx.objectStore("teams");
            console.log(dbteam);
            store.put(dbteam);
            return tx.complete;
        })
        .then(function () {
            console.log("CLub has saved.");
        });
}

function deleteCLub(savedTeam) {
    dbPromised
        .then(function (db) {
            let tx = db.transaction('teams', 'readwrite');
            let store = tx.objectStore('teams');
            store.delete(parseInt(savedTeam));
            return tx.complete;
        }).then(function () {
            console.log('Club Has deleted');
        });
}

function getAll() {
    return new Promise(function (resolve, reject) {
        dbPromised
            .then(db => {
                let tx = db.transaction("teams", "readonly");
                let store = tx.objectStore("teams");
                return store.getAll();
            })
            .then(dbteams => {
                resolve(dbteams);
            });
    });
}

function getById(id) {
    return new Promise(function (resolve, reject) {
        dbPromised
            .then(function (db) {
                var tx = db.transaction("teams", "readonly");
                var store = tx.objectStore("teams");
                return store.get(parseInt(id));
            })
            .then(function (dbteam) {
                document.getElementById("preloader").style.display = 'none';
                resolve(dbteam);
            });
    });
}