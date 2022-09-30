new Vue({
  el: '#app',
  data: {
     displayMessageError: "El campo 'X' debe ser un  dato valido",
     error:false,
     errors:{
     fullName: false,
     identityNumber: false,
     assemblyShoes: false,
     assemblyTennis: false,
     extraHoursQuantity:false,
     subsidy: false,
     bonus: false,
     },
     fullName: "",
     identityNumber: "",
     assemblyShoes: "",
     assemblyTennis: "",
     baseSalary: "",
     extraHoursQuantity:"",
     subsidy: "",
     bonus: "",
     resultLiquidation: 0,
     consolidationLiquidations: [],
     ASSEMBLER_STORAGE_KEY: "setAssemblerDataStorage",
     STORAGE_KEY: "setAssemblerLiquidationData",
     dataFromAdmin: {}
  },
  created(){
      this.consolidationLiquidations =  JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]') 

      this.dataFromAdmin = this.getParsedLocalStorage(this.ASSEMBLER_STORAGE_KEY) 
    },
  methods: {
    setLocalStorageData(key, data) {
      localStorage.setItem(key, JSON.stringify(data));
    },
    getParsedLocalStorage(key) {
          return JSON.parse(localStorage.getItem(key) || "[]");
    },
    message(title,timer,position,text){
      swal({
        position,
        text,
        icon: "success",
        title,
        dangerMode: false,
        timer
    })
  },
  defineExtraHours(extraHours, salary){
     return extraHours * ((salary/160) * 2.2)
  },
  showFormatedNumber(value){
      function thousandSeparator(number = 0, decimalsQuantity = 2) {
          return Number(number).toFixed(decimalsQuantity).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
        return thousandSeparator(value)
  },
  defineComissionShoes(salary, quantity,minPercent , maxPercent , maxValue ){
      if(quantity > 1000 && quantity <= maxValue){
          return  salary * (minPercent/100)
      }else if(quantity > 1700 && quantity < 2000){
          return  salary * (maxPercent/100)
      }return 0
  },
  defineComissionTennis(salary, quantity,minPercent , maxPercent , maxValue = 3000){
    if(quantity > 1700 && quantity <= maxValue ){
      return  salary * (minPercent/100)
  }else if(quantity > maxValue){
      return  salary * (maxPercent/100)
  }return 0
},
  defineBonusPerChild(num){
      if(num === 1){
          return 80000
      }else if(num > 1){
          return num * 60000
      }return  0
  },
  defineTotal(...values){
      return values.reduce((a,b) => a + b)
  },
  clearInputs() {
     this.fullName= "",
     this.identityNumber= "",
     this.assemblyShoes= "",
     this.assemblyTennis= "",
     this.baseSalary= "",
     this.extraHoursQuantity="",
     this.subsidy= "",
     this.bonus= ""
  },

  validateInputs() {
    error = false;
  if (typeof this.fullName !== 'string' || this.fullName === "" ) {
    this.errors.fullName = true;
    error = true;
    
  } else {
    this.errors.fullName = false;
  }
  if (typeof this.identityNumber !== 'number' ||  this.identityNumber === "") {
    this.errors.identityNumber = true;
    error = true;
    
  } else {
    this.errors.identityNumber = false;
  }
  if (typeof this.assemblyShoes !== 'number' ||  this.assemblyShoes === "") {
    this.errors.assemblyShoes = true;
    error = true;
    
  } else {
    this.errors.assemblyShoes = false;
  }
  if (typeof this.assemblyTennis !== 'number' ||  this.assemblyTennis === "") {
    this.errors.assemblyTennis = true;
    error = true;
    
  } else {
    this.errors.assemblyTennis = false;
  }
  if (typeof this.extraHoursQuantity !== 'number' ||  this.extraHoursQuantity === "") {
    this.errors.extraHoursQuantity = true;
    error = true;
    
  } else {
    this.errors.extraHoursQuantity = false;
  }if(typeof this.subsidy !== 'number' ||  this.subsidy === ""){
     this.errors.subsidy = true;
     error= true
     
  }else{
    this.errors.subsidy = false
  }if(typeof this.bonus !== 'number' ||  this.bonus === ""){
    this.errors.bonus = true;
    error = true 
    
 }else{
   this.errors.bonus = false
 }
  return error;
},
  calculateLiquidation() {
     const  {baseSalaryAssembler,minPercentShoes,minPercentTennis,maxTennisQuantity ,maxShoesQuantity, maxPercentTennis, maxPercentShoes
     } =  this.dataFromAdmin

     this.consolidationLiquidations.push({
      fullName: this.fullName,
      identityNumber: this.identityNumber,
      baseSalary: baseSalaryAssembler,
      extraHoursQuantity: this.defineExtraHours(this.extraHoursQuantity,baseSalaryAssembler),
      subsidy:this.subsidy,
      bonus: this.defineBonusPerChild(this.bonus),
      comissionShoes: this.defineComissionShoes(baseSalaryAssembler,this.assemblyShoes,minPercentShoes,maxPercentShoes, maxShoesQuantity ),

      comissionTennis: this.defineComissionTennis(baseSalaryAssembler,this.assemblyTennis,minPercentTennis,maxPercentTennis, maxTennisQuantity),
      total: this.defineTotal(baseSalaryAssembler,this.defineExtraHours(this.extraHoursQuantity, baseSalaryAssembler),this.subsidy,this.defineBonusPerChild(this.bonus),this.defineComissionShoes(baseSalaryAssembler,this.assemblyShoes,minPercentShoes,maxPercentShoes, maxShoesQuantity), this.defineComissionTennis(baseSalaryAssembler,this.assemblyTennis,minPercentTennis,maxPercentTennis, maxTennisQuantity))
    })
    console.log(this.consolidationLiquidations);
    this.setLocalStorageData(this.STORAGE_KEY, this.consolidationLiquidations)

    this.message('¡Enhorabuena!', 2500,'center','¡La liquidación se ha generado exitosamente!')
    this.clearInputs()
  },
  validateFormLiquidation(){
    this.validateInputs() ? this.error : this.calculateLiquidation()
  },
  deleteAlert(item) {
      swal({
          title: "¿Está seguro de eliminar?",
          text: "¡Este proceso es irreversible!",
          icon: "warning",
          buttons: true,
          dangerMode: true
        }).then((result) => {
          if (result) {
            this.consolidationLiquidations.splice(this.consolidationLiquidations.indexOf(item), 1)
            this.message(
              "Se eliminó correctamente",
              2000,
              "center",
              "¡Los cambios fueron guardados!"
            )
            this.setLocalStorageData(this.STORAGE_KEY, this.consolidationLiquidations)
          }
        })
  }
  }
})