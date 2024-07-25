// Attendre que la page soit complètement chargée
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');

    if (preloader) {
        // Assurez-vous que le préchargeur est présent
        setTimeout(() => {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
        }, 300); // La durée doit correspondre à celle définie dans le CSS
    }
});

// Le reste de votre code JavaScript
let jeuData = {}; // Variable globale pour stocker les données du JSON


async function chargerJSON() {
    try {
        // Charger les données JSON depuis le fichier
        const reponse = await fetch('JS/personnage-jeu.json');
        jeuData = await reponse.json();

        // Obtenir l'URL actuelle
        const urlCourante = window.location.href;
        console.log('URL actuelle:', urlCourante); // Afficher l'URL pour débogage

        // Extraire le nom de fichier HTML de l'URL
        const nomFichierHTML = urlCourante.substring(urlCourante.lastIndexOf('/') + 1);
        console.log('Nom du fichier HTML extrait:', nomFichierHTML); // Afficher le nom du fichier pour débogage

        // Initialiser les personnages en fonction du nom de fichier
        if (nomFichierHTML === "Honkai-Star-Rail.html") {
            if (jeuData.HonkaiStarRail) {
                pageacceuiljeu(jeuData.HonkaiStarRail);
            } else {
                console.warn('Données pour Honkai Star Rail non trouvées dans le JSON.');
            }
        } else if (nomFichierHTML === "ZZZ.html") {
            if (jeuData.ZZZ) {
                pageacceuiljeu(jeuData.ZZZ);
            } else {
                console.warn('Données pour ZZZ non trouvées dans le JSON.');
            }
        } else if (nomFichierHTML === "Wuthering-Waves.html") {
            if (jeuData.Wuwa) {
                pageacceuiljeu(jeuData.Wuwa);
            } else {
                console.warn('Données pour Wuthering Waves non trouvées dans le JSON.');
            }
        }
    } catch (error) {
        console.error('Erreur lors du chargement du fichier JSON:', error);
    }
}

let selectedElement = "";
let selectedvoie = "";
let selectedrang = "";

// Fonction de filtrage
function filtrerelement() {
    let personnages = document.querySelectorAll('.fiches article,  .pagepersonnage article');
    personnages.forEach(personnage => {
        const voie = personnage.dataset.voie;
        const element = personnage.dataset.element;
        const rang = personnage.dataset.rang;

        if ((selectedElement === "" || element === selectedElement) && 
            (selectedvoie === "" || voie === selectedvoie) && 
            (selectedrang === "" || rang === selectedrang)) {
            personnage.classList.remove('hidden');
        } else {
            personnage.classList.add('hidden');
        }
    });
};

document.querySelectorAll('.filter-button-element, .filter-button-voie, .filter-button-rang').forEach(button => {
    button.addEventListener('click', () => {
        if (button.dataset.element !== undefined) {
            selectedElement = button.dataset.element;
        }
        if (button.dataset.voie !== undefined) {
            selectedvoie = button.dataset.voie;
        }
        if (button.dataset.rang !== undefined) {
            selectedrang = button.dataset.rang;
        }
        filtrerelement();
    });
});



function pageacceuiljeu(personnages) {
    const sectionFiches = document.querySelector(".fiches");
    const elementimage = {

        //Honkai star rail
        "Foudre" : 'url("images/HSR/element/foudre.webp")',
        "Feu" : 'url("images/HSR/element/feu.webp")',
        "Glace" : 'url("images/HSR/element/glace.webp")',
        "Physique" : 'url("images/HSR/element/physique.webp")',
        "Quantique" : 'url("images/HSR/element/quantique.webp")',
        "Imaginaire" : 'url("images/HSR/element/imaginaire.webp")',
        "Vent" : 'url("images/HSR/element/vent.webp")',

        // Zenless Zone Zero
        "physique" : 'url("images/ZZZ/element/physique.webp")',
        "feu" : 'url("images/ZZZ/element/feu.webp")',
        "glace" : 'url("images/ZZZ/element/glace.webp")',
        "Electrique" : 'url("images/ZZZ/element/electrique.webp")',
        "Ether" : 'url("images/ZZZ/element/ether.webp")',

        // Wuthering Waves
        "Aero" : 'url("images/WUWA/element/aero.webp")',
        "Electro" : 'url("images/WUWA/element/electro.webp")',
        "Fusion" : 'url("images/WUWA/element/fusion.webp")',
        "Glacio" : 'url("images/WUWA/element/glacio.webp")',
        "Havoc" : 'url("images/WUWA/element/havoc.webp")',
        "Spectro" : 'url("images/WUWA/element/spectro.webp")'
    }

    const typeimage = {
        //Honkai star rail
        "Chasse" : 'url("images/HSR/voie/chasse.webp")',
        "Destruction" : 'url("images/HSR/voie/destruction.webp")',
        "Nihilité" : 'url("images/HSR/voie/nihiliter.webp")',
        "Erudition" : 'url("images/HSR/voie/erudition.webp")',
        "Abondance" : 'url("images/HSR/voie/abondance.webp")',
        "Harmonie" : 'url("images/HSR/voie/harmonie.webp")',
        "Préservation" : 'url("images/HSR/voie/preservation.webp")',

        // Zenless Zone Zero
        "Attack" : 'url("images/ZZZ/voie/attack.webp")',
        "Confusion" : 'url("images/ZZZ/voie/confusion.webp")',
        "Support" : 'url("images/ZZZ/voie/support.webp")',
        "Anomalie" : 'url("images/ZZZ/voie/anomalie.webp")',
        "Defense" : 'url("images/ZZZ/voie/defense.webp")',

        // Wuthering Waves
        "Broadblade" : 'url("images/WUWA/arme/broadblade.webp")',
        "Gauntlets" : 'url("images/WUWA/arme/gauntlets.webp")',
        "Pistols" : 'url("images/WUWA/arme/pistols.webp")',
        "Rectifier" : 'url("images/WUWA/arme/rectifier.webp")',
        "Sword" : 'url("images/WUWA/arme/sword.webp")'
    }

    // Assurez-vous que la section est vide avant d'ajouter les nouveaux éléments
    sectionFiches.innerHTML = '';
    
    personnages.forEach(article => {
        // Créer l'élément article pour chaque personnage
        const personnageElement = document.createElement("article");
        personnageElement.dataset.id = article.id;
        personnageElement.classList.add("personnage");
        
        
        const lienElement = document.createElement("a");
        lienElement.href = article.lien;
        // Créer et ajouter les sous-éléments
        const imageElement = document.createElement("img");
        imageElement.src = article.image;

        

        const nomElement = document.createElement("h2");
        nomElement.innerText = article.nom;

        const voieElement = document.createElement("p");

        personnageElement.dataset.voie = article.voie;

        const elementElement = document.createElement("p");

        personnageElement.dataset.element = article.element;

        const rangElement = document.createElement("p");

        personnageElement.dataset.rang = article.rang;

        personnageElement.style.backgroundColor = article.rang !== "4" && article.rang !== "A" ? '#FFA500' : '#733CFF';

        // Styles pour le conteneur de l'image de l'élément
        elementElement.style.backgroundImage = elementimage[article.element];
        elementElement.style.backgroundRepeat = "no-repeat";
        elementElement.style.backgroundSize = "100%";
        elementElement.style.position = 'absolute';
        elementElement.style.top = '0';
        elementElement.style.right = '0';
        elementElement.style.width = '25px'; 
        elementElement.style.height = '25px';
        elementElement.style.zIndex = '10';

        // Styles pour le conteneur de l'image de la voie
        voieElement.style.backgroundImage = typeimage[article.voie];
        voieElement.style.backgroundRepeat = "no-repeat";
        voieElement.style.backgroundSize = "100%";
        voieElement.style.position = 'absolute';
        voieElement.style.top = '0';
        voieElement.style.width = '25px'; 
        voieElement.style.height = '25px';
        elementElement.style.zIndex = '10';


       
        // Ajouter les éléments au DOM
        personnageElement.appendChild(lienElement);
        lienElement.appendChild(imageElement);
        personnageElement.appendChild(nomElement);
        personnageElement.appendChild(voieElement);
        personnageElement.appendChild(elementElement);
        personnageElement.appendChild(rangElement);
        sectionFiches.appendChild(personnageElement);
    });
}

document.addEventListener("DOMContentLoaded", function() {
    // Sélectionner tous les boutons avec la classe filter-button
    const buttons = document.querySelectorAll('.filter-button-element');

    // Ajouter un écouteur d'événement à chaque bouton
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            // Retirer la classe active de tous les boutons
            buttons.forEach(btn => btn.classList.remove('active'));
            
            // Ajouter la classe active uniquement au bouton cliqué
            this.classList.add('active');
        });
    });
});

document.addEventListener("DOMContentLoaded", function() {
    // Sélectionner tous les boutons avec la classe filter-button
    const buttons = document.querySelectorAll('.filter-button-rang');

    // Ajouter un écouteur d'événement à chaque bouton
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            // Retirer la classe active de tous les boutons
            buttons.forEach(btn => btn.classList.remove('active'));
            
            // Ajouter la classe active uniquement au bouton cliqué
            this.classList.add('active');
        });
    });
});

document.addEventListener("DOMContentLoaded", function() {
    // Sélectionner tous les boutons avec la classe filter-button
    const buttons = document.querySelectorAll('.filter-button-voie');
    
    // Ajouter un écouteur d'événement à chaque bouton
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            // Retirer la classe active de tous les boutons
            buttons.forEach(btn => btn.classList.remove('active'));
            
            // Ajouter la classe active uniquement au bouton cliqué
            this.classList.add('active');
        });
    });
});

document.getElementById('element').addEventListener('change', function() {
    filtrerelement(this.value, document.getElementById('voie').value, document.getElementById('rang').value);
});

document.getElementById('voie').addEventListener('change', function() {
    filtrerelement(document.getElementById('element').value, this.value, document.getElementById('rang').value);
});

document.getElementById('rang').addEventListener('change', function() {
    filtrerelement(document.getElementById('element').value, document.getElementById('voie').value, this.value);
});
document.addEventListener('DOMContentLoaded', () => pageacceuiljeu(personnages));
chargerJSON();

