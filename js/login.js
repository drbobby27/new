new Vue({
  el: "#app",
  data: {
    position: ["administrador", "secretario", "vendedor", "ensamblador"],
    optionPosition: "",
    pin: "",
    userCredentials: [
      { position: "administrador", pin: "123456" },
      { position: "secretario", pin: "12345678" },
      { position: "vendedor", pin: "87654321" },
      { position: "ensamblador", pin: "12345" },
      { position: "ensamblador", pin: "56789" },
      { position: "secretario", pin: "123" },
    ],
    errorPosition: false,
    errorPin: false,
  },
  methods: {
    clearForm() {
      this.optionPosition = "";
      this.pin = "";
    },
    validateCredentials(user, key) {
      this.fieldValidations(user, key)
      let loguedUser = [];
      let session = this.userCredentials.filter(
        (({position, pin})  => position === user && pin === key)
      );
      loguedUser = [...session];
      loguedUser.length === 0 ? this.message( "Oops", 3200,"center","Verifique que los datos sean correctos","error"): this.Session(loguedUser);
      return this.clearForm();
    },
    Session(data){
      console.log(data)
      let info = data[0].position;
      if(info === "vendedor") {
        this.message(
          "¡Datos correctos!",
          3200,
          "center",
          "Ingreso exito",
          "success"
          );
          console.log(info)
          window.location.href = '../view/seller.html'
      } else if(info === "ensamblador") {
        this.message(
          "¡Datos correctos!",
          3200,
          "center",
          "Ingreso exito",
          "success"
          );
          console.log(info)
          window.location.href = '../view/assembler.html'
      } else if(info === "secretario") {
        console.log(info)
          this.message(
            "¡Datos correctos!",
            3200,
            "center",
            "Ingreso exito",
            "success"
          );
          window.location.href = '../view/secretary.html'
      } else if(info === "administrador") {
        console.log(info)
          this.message(
            "¡Datos correctos!",
            3200,
            "center",
            "Ingreso exito",
            "success"
          );
          window.location.href = '../view/administrator.html'
      }
          console.log(info)
    },
    fieldValidations() {
      error = false;
      if (this.optionPosition === "") {
        this.errorPosition = true;
        error = true;
      } else {
        this.errorPosition = false;
      }
      if (this.pin === "") {
        this.errorPin = true;
        error = true;
      } else {
        this.errorPin = false;
      }
      return error;
    },
    message(title, timer, position, text, icon) {
      console.log({
        position,
        text,
        icon,
        title,
        showConfirmButton: false,
        timer,
      });
    },
  },
});