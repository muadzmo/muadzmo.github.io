window.addEventListener('DOMContentLoaded', (event) => {
    setTimeout(()=>{preload.style.display = "none"}, 500);
    console.log(team);
    save.style.display = "block";
    cancel.style.display = "none";
});

team = getTeamById();

let save = document.getElementById("save");
save.onclick = () => {
  console.log("Tombol FAB di klik.");
  team.then((team) => {
    console.log('55');
    saveForLater(team);
  });
  save.style.display = "none";
  cancel.style.display = "block";
}

let cancel = document.getElementById("cancel");
cancel.onclick = () => {
  console.log("Tombol FAB di klik.");
  team.then((team) => {
    console.log('83');
    cancelForLater(team);
  });
  save.style.display = "block";
  cancel.style.display = "none";
}