const form = document.getElementById("mangaForm");
const list = document.getElementById("mangaList");

async function loadManga() {
  const res = await fetch("/api/manga");
  const data = await res.json();
  list.innerHTML = "";
  data.forEach(m => {
    const li = document.createElement("li");
    li.innerText = `${m.title} - ${m.author || ""}`;
    list.appendChild(li);
  });
}

form.addEventListener("submit", async e => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("title", title.value);
  formData.append("author", author.value);
  formData.append("chapters", chapters.value);
  formData.append("coverImage", coverImage.files[0]);

  await fetch("/api/manga/add", {
    method: "POST",
    body: formData
  });

  form.reset();
  loadManga();
});


loadManga();
