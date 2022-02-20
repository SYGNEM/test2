// jshint esversion: 6
// jshint esversion: 8

// router config
class Router {
    /**
     * Metodo inicial.
     *
     * @return {void}.
     */
    constructor(paths) {
        this.paths = paths;
        this.initRouter();
    }

    /**
     * Permite inicializar el router
     *
     * @return {void}.
     */
    initRouter() {
        const {
            location: {
                pathname = "/"
            }
        } = window;
        const URI = pathname === "/" ? "home" : pathname.replace("/", "");
        this.load(URI);
    }

    /**
     * Permite iniciar la carga de paginas.
     *
     * @return {void}.
     */
    load(page = "home") {
        const { paths } = this;
        const { path, template } = paths[page] || paths.error;
        const $CONTAINER = document.querySelector("#content");
        $CONTAINER.innerHTML = template;
        window.history.pushState({}, "Genial", path);
    }

}


// Define Paths 
const PATHS = {
    home: {
        path: "/",
        template: `
            <h1>🏠 Home</h1>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsum harum aliquam reiciendis dignissimos? Perferendis consequuntur vitae fugiat fuga neque ipsum?</p>
            <img src="https://source.unsplash.com/random/400x300" alt="Random Image">
        `,
    },
    about: {
        path: "/about",
        template: `
            <h1>👩🏻‍💻 Sobre mi</h1>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsum harum aliquam reiciendis dignissimos? Perferendis consequuntur vitae fugiat fuga neque ipsum?</p>
            <img src="https://source.unsplash.com/random/500x400" alt="Random Image">
        `,
    },
    contact: {
        path: "/contact",
        template: `
            <h1>📱 Contacto</h1>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsum harum aliquam reiciendis dignissimos? Perferendis consequuntur vitae fugiat fuga neque ipsum?</p>
            <img src="https://source.unsplash.com/random/600x500" alt="Random Image">
        `,
    }
};

const ROUTER = new Router(PATHS);