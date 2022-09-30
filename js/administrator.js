new Vue({
  el: "#app",
  data: {
    error: false,
    defaultRol: null,
    wholeRoles: ["Secretario", "Vendedor", "Ensamblador"],
    errorOptions: false,
    errorsAssembler: {
      baseSalary: false,
      minPercentShoes: false,
      maxPercentShoes: false,
      minPercentTennis: false,
      maxPercentTennis: false,
      maxShoesQuantity: false,
      maxTennisQuantity: false,
    },
    errorsSeller: {
      baseSalary: false,
      minComission: false,
      maxComission: false,
    },
    errorsSecretary: {
      baseSalary: false,
    },
    inputRoles: {
      assembler: {
        baseSalaryAssembler:"",
        minPercentShoes:"",
        maxPercentShoes:"",
        minPercentTennis:"",
        maxPercentTennis:"",
        maxShoesQuantity:"",
        maxTennisQuantity:"",
      },
      secretary: {
        baseSalarySecretary:"",
      },
      seller: {
        baseSalarySeller:"",
        minComission:"",
        maxComission:"",
      },
    },
    Secretary: {},
    Assembler: {},
    Seller: {},
    wholeParsedData: {},
    SECRETARY_STORAGE_KEY: "setSecretaryDataStorage",
    SELLER_STORAGE_KEY: "setSellerDataStorage",
    ASSEMBLER_STORAGE_KEY: "setAssemblerDataStorage",
  },
  created() {
    this.Secretary = this.getParsedLocalStorage(this.SECRETARY_STORAGE_KEY);

    this.Assembler = this.getParsedLocalStorage(this.ASSEMBLER_STORAGE_KEY);

    this.Seller = this.getParsedLocalStorage(this.SELLER_STORAGE_KEY);

  },
  methods: {

    setLocalStorageData(key, data) {
      localStorage.setItem(key, JSON.stringify(data));
    },
    getParsedLocalStorage(key) {
      return JSON.parse(localStorage.getItem(key) || "[]");
    },
    defineComissionShoes(quantity, salary, min = 1000, max = 2000) {
      if (quantity > min && quantity <= max) {
        return salary * 0.1;
      } else if (quantity > max) {
        return salary * 0.2;
      } else return 0;
    },
    defineComissionTennis(max = 3000, min = 1700, quantity, salary) {
      if (quantity > min && quantity < 2000) {
        return salary * 0.15;
      } else if (quantity > 3000) {
        return salary * 0.3;
      } else return 0;
    },
    setDataSecretary() {
      this.Secretary = {
        baseSalarySecretary: this.inputRoles.secretary?.baseSalarySecretary,
      };
      this.setLocalStorageData(this.SECRETARY_STORAGE_KEY, this.Secretary)
      
      this.message(
        "¡Enhorabuena!",
        2000,
        "center",
        "¡Los cambios fueron guardados correctamente!",
        false
      );
      this.inputRoles.secretary.baseSalarySecretary = "";
    },

    setDataAssembler() {
      this.Assembler = {
        baseSalaryAssembler: this.inputRoles.assembler.baseSalaryAssembler,
        minPercentShoes: this.inputRoles.assembler.minPercentShoes,
        maxPercentShoes: this.inputRoles.assembler.maxPercentShoes,
        minPercentTennis: this.inputRoles.assembler.minPercentTennis,
        maxPercentTennis: this.inputRoles.assembler.maxPercentTennis,
        maxShoesQuantity: this.inputRoles.assembler.maxShoesQuantity,
        maxTennisQuantity: this.inputRoles.assembler.maxTennisQuantity,
      };
      this.setLocalStorageData(this.ASSEMBLER_STORAGE_KEY, this.Assembler);
      
      this.message(
        "¡Enhorabuena!",
        2000,
        "center",
        "¡Los cambios fueron guardados correctamente!",
        false
      );
      this.inputRoles.assembler.baseSalaryAssembler = "";
      this.inputRoles.assembler.minPercentShoes = "";
      this.inputRoles.assembler.maxPercentShoes = "";
      this.inputRoles.assembler.minPercentTennis = "";
      this.inputRoles.assembler.maxPercentTennis = "";
      this.inputRoles.assembler.maxShoesQuantity = "";
      this.inputRoles.assembler.maxTennisQuantity = "";
    },
    setDataSeller() {
      this.Seller = {
        baseSalarySeller: this.inputRoles.seller.baseSalarySeller,
        minComission: this.inputRoles.seller.minComission,
        maxComission: this.inputRoles.seller.maxComission,
      };
      this.setLocalStorageData(this.SELLER_STORAGE_KEY, this.Seller);
      
      this.message(
        "¡Enhorabuena!",
        2000,
        "center",
        "¡Los cambios fueron guardados correctamente!",
        false
      );
      this.inputRoles.seller.baseSalarySeller = "";
      this.inputRoles.seller.minComission = "";
      this.inputRoles.seller.maxComission = "";
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
    showFormatedNumber(value) {
      function thousandSeparator(number = 0, decimalsQuantity = 2) {
        return Number(number)
          .toFixed(decimalsQuantity)
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
      return thousandSeparator(value);
    },
    validateInputsSecretary(){
      error = false;
      if (typeof this.inputRoles.secretary.baseSalarySecretary !== 'number' ||  this.inputRoles.secretary.baseSalarySecretary === ""){
        this.errorsSecretary.baseSalary = true;
        error= true
     }
     else {
      this.errorsSecretary.baseSalary = false;
    }
     return error;
    },
    validateInputsAssembler(){
      error = false;
      if (typeof this.inputRoles.assembler.baseSalaryAssembler !== 'number' || this.inputRoles.assembler.baseSalaryAssembler === "" ) {
        this.errorsAssembler.baseSalary = true;
        error = true;
      } else {
        this.errorsAssembler.baseSalary = false;
      }
      if (typeof this.inputRoles.assembler.minPercentShoes !== 'number' ||  this.inputRoles.assembler.minPercentShoes === "") {
        this.errorsAssembler.minPercentShoes = true;
        error = true;
      } else {
        this.errorsAssembler.minPercentShoes = false;
      }
      if (typeof this.inputRoles.assembler.maxPercentShoes !== 'number' ||  this.inputRoles.assembler.maxPercentShoes === "") {
        this.errorsAssembler.maxPercentShoes = true;
        error = true;
      } else {
        this.errorsAssembler.maxPercentShoes = false;
      }
      if (typeof this.inputRoles.assembler.minPercentTennis !== 'number' ||  this.inputRoles.assembler.minPercentTennis === "") {
        this.errorsAssembler.minPercentTennis = true;
        error = true;
      } else {
        this.errorsAssembler.minPercentTennis = false;
      }
      if (typeof this.inputRoles.assembler.maxPercentTennis !== 'number' ||  this.inputRoles.assembler.maxPercentTennis === "") {
        this.errorsAssembler.maxPercentTennis = true;
        error = true;
      } else {
        this.errorsAssembler.maxPercentTennis = false;
      } if(typeof this.inputRoles.assembler.maxShoesQuantity !== 'number' ||  this.inputRoles.assembler.maxShoesQuantity === ""){
         this.errorsAssembler.maxShoesQuantity = true;
         error= true
      }else{
        this.errorsAssembler.maxShoesQuantity = false
      }if(typeof this.inputRoles.assembler.maxTennisQuantity !== 'number' ||  this.inputRoles.assembler.maxTennisQuantity === ""){
        this.errorsAssembler.maxTennisQuantity = true;
        error = true 
     }else{
       this.errorsAssembler.maxTennisQuantity = false
     }
      return error;
    },
    validateInputsSeller(){
      error = false;
      if (typeof this.inputRoles.seller.baseSalarySeller !== 'number' ||  this.inputRoles.seller.baseSalarySeller === ""){
        this.errorsSeller.baseSalary = true;
        error= true
     }
     else{
      this.errorsSeller.baseSalary = false
    }
     if (typeof this.inputRoles.seller.minComission !== 'number' ||  this.inputRoles.seller.minComission === ""){
      this.errorsSeller.minComission = true;
      error= true
    }
    else{
      this.errorsSeller.minComission = false
    }
    if (typeof this.inputRoles.seller.maxComission !== 'number' ||  this.subsidy === ""){
    this.errorsSeller.maxComission = true;
    error= true
 }
 else{
  this.errorsSeller.maxComission = false
}
     return error;
    },
  validateFormSecretary(){
    this.validateInputsSecretary() ? this.error : this.setDataSecretary()
  },
  validateFormAssembler(){
    this.validateInputsAssembler() ? this.error : this.setDataAssembler()
  },
  validateFormSeller(){
    this.validateInputsSeller() ? this.error : this.setDataSeller()
  }

  },
});
