import{a as j}from"./chunk-YH4HCML3.js";import{d as S,e as k,g as E}from"./chunk-3YR7BGO7.js";import{a as F,c as L,d as N,e as A,f as I,g as R,n as T,p as V}from"./chunk-JPVO3FME.js";import"./chunk-3MSBGUPK.js";import"./chunk-FSVENPIU.js";import{k as y,m as v,o as O}from"./chunk-UEWRNPXW.js";import{Ab as w,Db as u,Eb as f,Fb as b,Hb as M,Ib as P,Oa as C,Ra as a,Sa as p,da as _,eb as h,ib as g,mb as e,nb as t,ob as l,vb as m,wb as x,zb as o}from"./chunk-4YPG6D4H.js";var B=()=>["/register-user"];function D(s,c){if(s&1&&(e(0,"div")(1,"p"),o(2),t()()),s&2){let i=x();a(2),w(i.errorMessage)}}var z=class s{constructor(c,i){this.router=c;this.authService=i}email="";password="";showPassword=!1;errorMessage="";login(){this.authService.login(this.email,this.password).subscribe({next:()=>this.router.navigate(["/home"]),error:c=>console.error("login failed",c)})}togglePasswordVisibility(){this.showPassword=!this.showPassword}static \u0275fac=function(i){return new(i||s)(p(S),p(j))};static \u0275cmp=_({type:s,selectors:[["app-login"]],standalone:!0,features:[M],decls:45,vars:7,consts:[[1,"login-container"],["href",C`https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css`,"rel","stylesheet","integrity","sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN","crossorigin","anonymous"],[1,"card","login-form"],[3,"submit"],[1,"input-container"],["for","email"],[1,"input-wrapper"],["placeholder","Correo electr\xF3nico","id","email","name","email","required","",3,"ngModelChange","ngModel"],["for","password"],["placeholder","Contrase\xF1a","id","password","name","password","required","",3,"ngModelChange","ngModel","type"],[1,"show-password",3,"click"],[1,"fa",3,"ngClass"],[1,"actions"],["href","#"],["type","submit",1,"login-button",3,"click"],[1,"alternative-login"],[1,"social-login-buttons"],["href","https://www.facebook.com","target","_blank","rel","noopener noreferrer",1,"social-button"],[1,"fa","fa-facebook"],["href","https://www.instagram.com","target","_blank","rel","noopener noreferrer",1,"social-button"],[1,"fa","fa-instagram"],["href","https://accounts.google.com","target","_blank","rel","noopener noreferrer",1,"social-button"],[1,"fa","fa-google"],[1,"add-newAccount"],[1,"registration-text"],[1,"create-account-button",3,"routerLink"],[4,"ngIf"],[1,"login-image"],["src","/undraw_security_re_a2rk.svg","alt","Login Ilustration"]],template:function(i,n){i&1&&(e(0,"div",0),l(1,"link",1),e(2,"div",2)(3,"h1"),o(4,"Bienvenido de nuevo!"),t(),e(5,"p"),o(6,"Completa toda la informaci\xF3n para comenzar a explorar."),t(),e(7,"form",3),m("submit",function(){return n.login()}),e(8,"div",4)(9,"label",5),o(10,"Email:"),t(),e(11,"div",6)(12,"input",7),b("ngModelChange",function(r){return f(n.email,r)||(n.email=r),r}),t()()(),e(13,"div",4)(14,"label",8),o(15,"Contrase\xF1a:"),t(),e(16,"div",6)(17,"input",9),b("ngModelChange",function(r){return f(n.password,r)||(n.password=r),r}),t(),e(18,"span",10),m("click",function(){return n.togglePasswordVisibility()}),l(19,"i",11),t()()(),e(20,"div",12)(21,"a",13),o(22,"Recuperar contrase\xF1a"),t(),e(23,"p"),o(24,"\xBFOlvidaste tu contrase\xF1a?"),t()(),e(25,"button",14),m("click",function(){return n.login()}),o(26,"Ingresar"),t(),e(27,"div",15)(28,"p"),o(29,"O"),t(),e(30,"div",16)(31,"a",17),l(32,"i",18),t(),e(33,"a",19),l(34,"i",20),t(),e(35,"a",21),l(36,"i",22),t()()(),e(37,"div",23)(38,"p",24),o(39,"\xBFEres nuevo? Reg\xEDstrate:"),t(),e(40,"button",25),o(41,"Crear cuenta nueva"),t()()(),h(42,D,3,1,"div",26),t(),e(43,"div",27),l(44,"img",28),t()()),i&2&&(a(12),u("ngModel",n.email),a(5),u("ngModel",n.password),g("type",n.showPassword?"text":"password"),a(2),g("ngClass",n.showPassword?"fa-eye-slash":"fa-eye"),a(21),g("routerLink",P(6,B)),a(2),g("ngIf",n.errorMessage))},dependencies:[V,R,F,L,N,T,I,A,O,y,v,E,k],styles:['@charset "UTF-8";body[_ngcontent-%COMP%]{font-family:Arial,sans-serif;background-color:#1e1e2f;color:#fff;margin:0}.login-container[_ngcontent-%COMP%]{display:flex;height:100vh;justify-content:center;align-items:center;padding:0 20px}.card[_ngcontent-%COMP%]{background-color:#fff;padding:40px;border-radius:12px;box-shadow:0 8px 16px #0003;width:45%}.login-form[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{font-size:2rem;margin-bottom:10px;font-family:Arial,sans-serif}.login-form[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin-bottom:30px;font-size:1.1rem;color:#a0a0b1;font-family:Arial,sans-serif}.input-container[_ngcontent-%COMP%]{margin-bottom:15px}.input-wrapper[_ngcontent-%COMP%]{display:flex;align-items:center;position:relative}.input-container[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{display:block;margin-bottom:5px;font-family:Arial,sans-serif}.input-container[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{width:100%;padding:10px;border-radius:6px;border:1px solid #092565;font-size:1rem;background-color:#f8f8f9;color:#000}.show-password[_ngcontent-%COMP%]{position:absolute;right:10px;cursor:pointer;color:#a0a0b1;font-size:1.2rem}.actions[_ngcontent-%COMP%]{display:flex;justify-content:flex-start;justify-content:space-between;margin-bottom:20px}.actions[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{display:contents;font-size:16px}.login-button[_ngcontent-%COMP%]{width:100%;padding:12px;background-color:#08349c;border:none;color:#fff;font-size:.9rem;border-radius:6px;cursor:pointer;margin-bottom:20px}.alternative-login[_ngcontent-%COMP%]{text-align:center;margin-top:18px}.alternative-login[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin-bottom:18px;color:#a0a0b1}.social-login-buttons[_ngcontent-%COMP%]{display:flex;justify-content:center;gap:10px}.social-button[_ngcontent-%COMP%]{width:45px;height:45px;border-radius:50%;background-color:#f0f0f0;color:#333;display:flex;justify-content:center;align-items:center;cursor:pointer;border:none;text-decoration:none;padding:2px;transition:background-color .3s}.social-button[_ngcontent-%COMP%]:hover{background-color:#ddd}.add-newAccount[_ngcontent-%COMP%]{margin-top:20px;padding:15px;background-color:#f9f9f9;border:1px solid #ddd;border-radius:5px;text-align:center}.registration-text[_ngcontent-%COMP%]{font-size:1em;margin-bottom:10px;color:#333}.create-account-button[_ngcontent-%COMP%]{text-decoration:none;padding:10px 15px;background-color:#007bff;color:#fff;border-radius:5px;transition:background-color .3s}.create-account-button[_ngcontent-%COMP%]:hover{background-color:#0056b3}.login-image[_ngcontent-%COMP%]{width:55%;display:flex;justify-content:center;align-items:center}.login-image[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{max-width:80%;height:auto}@media (max-width: 768px){.login-container[_ngcontent-%COMP%]{flex-direction:column}.login-form[_ngcontent-%COMP%], .login-image[_ngcontent-%COMP%]{width:100%}.login-image[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{max-width:100%}}']})};export{z as LoginComponent};
