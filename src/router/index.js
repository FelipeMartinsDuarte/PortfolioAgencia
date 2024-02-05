import { createWebHistory, createRouter } from "vue-router";
import Home from "../views/HomePage";
import DellieVeju from "../views/Case";
import Contato from "../views/Contact";
import LoginEmail from "../views/LoginEmail";
import LoginId from "../views/LoginId";
import ForgetPassword from "../views/ForgetPassword";
import ChangePassword from "../views/ChangePassword";
import Signup from "../views/Signup";
import ContratosInitial from "../views/ContratosInitial";
import ContratosForms from "../views/ContratosForms";
import ContratosPayment from "../views/ContratosPayment";
import ContratosEnd from "../views/ContratosEnd";
import UserPage from "../views/UserPage";
import PageInvalid from "../views/PageInvalid";
const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/caso/dellieveju",
        name: "DellieVeju",
        component: DellieVeju,
    },
    {
        path: "/contato",
        name: "Contato",
        component: Contato,
    },
    {
        path: "/entrar",
        name: "LoginEmail",
        component: LoginEmail,
    },
    {
        path: "/entrar/id",
        name: "LoginId",
        component: LoginId,
    },
    {
        path: "/entrar/esqueciasenha",
        name: "ForgetPassword",
        component: ForgetPassword,
    },
    {
        path: "/entrar/trocarsenha/:encrip",
        name: "ChangePassword",
        component: ChangePassword,
    },
    {
        path: "/admin/cadastrar",
        name: "Signup",
        component: Signup,
    },
    {
        path: "/contratos/:id",
        name: "ContratoInitial",
        component: ContratosInitial,
    },
    {
        path: "/contratos/:id/preenchimento",
        name: "ContratoForms",
        component: ContratosForms,
    },
    {
        path: "/contratos/:id/preenchimento/pagamento",
        name: "ContratosPayment",
        component: ContratosPayment,
    },
    {
        path: "/contratos/finalizar/:id",
        name: "ContratosEnd",
        component: ContratosEnd,
    },
    {
        path: "/usuario",
        name: "UserPage",
        component: UserPage,
    },
    {
        path: "/algodeuerrado",
        name: "PageInvalid",
        component: PageInvalid,
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;