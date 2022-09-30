 new Vue({
    el: "#app",
    data: {
      baseSalary: "",
      extraHours: "",
      totalPay: 0,
      errorExtraHours: false,
      errorBaseSalary: false,
      totalExtraHours: 0,
      dataSecretarys: [],
      extraHoursPercent: 1.8,
      SECRETARY_STORAGE_KEY: "setSecretaryDataStorage",
      configAdmin:{}
    },
    created() {
      this.dataSecretaryStorangs = JSON.parse(localStorage.getItem("dataSecretarys") || '[]')
      this.configAdmin = this.getParsedLocalStorage(this.SECRETARY_STORAGE_KEY)
    },
    methods: {
      updateLocalStorage(){
        return localStorage.setItem("dataStorang", JSON.stringify(this.dataSecretarys))
      },
      getParsedLocalStorage(key) {
        return JSON.parse(localStorage.getItem(key) || "[]");
      },
      show(){
        console.log(this.configAdmin)
      },
      addSecretary() {
        this.fieldValidations() ? this.error : this.createSecretary();
      },
      createSecretary() {
        this.dataSecretarys.push({
          baseSalarySec: this.configAdmin.baseSalarySecretary,
          extraHourSec: this.extraHours,
          totalPaySec: this.calculate(),
        });
        this.message('¡Enhorabuena!', 2500,'center','¡La liquidación se ha generado exitosamente!')
        this.updateLocalStorage(); 
        this.clearForm();     
      },
      clearForm() {
          (this.extraHours = "");
      },
      thousandSeparator(number = 0, decimalsQuantity = 2) {
          return Number(number)
          .toFixed(decimalsQuantity)
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      },
      showFormatedNumber(value) {
        function thousandSeparator(number = 0, decimalsQuantity = 2) {
          return Number(number)
            .toFixed(decimalsQuantity)
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
        return thousandSeparator(value);
      },
      calculate() {
        this.baseSalary = this.configAdmin.baseSalarySecretary;
        const horaNormal = this.baseSalary / 160;
        return this.extraHours * (horaNormal * this.extraHoursPercent);     
      },
      fieldValidations() {
        error = false;
        if (this.extraHours === "" || this.extraHours <= 0 || typeof this.extraHours !== "number") {
          this.errorExtraHours = true;
          error = true;
        } else {
          this.errorExtraHours = false;
        }
        return error;
      },
      message(title, timer, position, text, button) {
        swal({
          position,
          text,
          icon: "success",
          title,
          dangerMode: false,
          timer,
          button,
        });
      },
      messageDelete(index) {
        swal({
          title: "¿Está seguro de eliminar?",
          text: "¡Este proceso es irreversible!",
          icon: "warning",
          buttons: true,
          dangerMode: true
        }).then((result) => {
          if (result) {
            this.dataSecretarys.splice(index,1);
            this.message(
              "Se eliminó correctamente",
              2000,
              "center",
              "¡Los cambios fueron guardados!"
            )
            this.updateLocalStorage()
          }
        })
      }
    },
  });