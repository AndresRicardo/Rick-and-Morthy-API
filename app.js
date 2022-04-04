//evento que indica cuando se ha termiando de cargar todo el DOM
document.addEventListener("DOMContentLoaded", () => {
    fetchData();
});

const fetchData = async () => {
    try {
        loadingData(true);

        const res = await fetch("https://rickandmortyapi.com/api/character");
        const data = await res.json();

        pintarData(data);
    } catch (error) {
        console.log("error");
    } finally {
        loadingData(false);
    }
};

//mostrar/ocultar spinner de carga
const loadingData = (estado) => {
    const loading = document.querySelector("#loading");

    if (estado) {
        loading.classList.remove("d-none");
        loading.classList.add("d-flex");
    } else {
        loading.classList.remove("d-flex");
        loading.classList.add("d-none");
    }
};

const pintarData = (data) => {
    const container = document.querySelector("#container");
    const templateCard = document.querySelector("#templateCard").content;
    const fragment = document.createDocumentFragment();

    data.results.forEach((item) => {
        const clone = templateCard.cloneNode(true);

        clone.querySelector(".cardImage img").setAttribute("src", item.image);
        clone.querySelector("h4").textContent = item.name;
        clone.querySelector("p").textContent = item.species;

        //colocamos primero todo en el fragment para evitar el reflow
        fragment.appendChild(clone);
    });

    container.appendChild(fragment);
};
