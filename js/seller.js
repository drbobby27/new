new Vue( {
    el: '#app',
    data: {
        baseSalary: "",
        totalSales: "",
        transportSubsidy: 117172,
        overtimePrice: 38000,
        totalPay: 0,
        extraHours: "",
        totalCommission: 0,
        errorBaseSalary: false,
        errorExtraHours: false,
        errorTotalSales: false,
        errorTransportSubsidy: false,
        dataSellers: [],
        SELLER_STORAGE_KEY: "setSellerDataStorage",
        configAdmin:{}
    },
    created() {
        this.dataSellerStorangs = JSON.parse(localStorage.getItem("dataSellers") || '[]')
        this.configAdmin = this.getParsedLocalStorage(this.SELLER_STORAGE_KEY)
    },
    methods: {
        updateLocalStorage() {
            localStorage.setItem("dataStorang", JSON.stringify(this.dataSellers))
        },
        getParsedLocalStorage(key) {
          return JSON.parse(localStorage.getItem(key) || "[]");
        },
        show(){
          console.log(this.configAdmin)
        },
        addSeller(){
          this.fieldValidations() ? this.error : this.createrSeller()  
        },
        createrSeller() {
            this.dataSellers.push({
                baseSalarySel: this.configAdmin.baseSalarySeller,
                totalSalesSel: this.totalSales,
                transportSubsidySel: this.transportSubsidy,
                totalPaySel: this.calculate()
            })
            this.message('¡Enhorabuena!', 2500,'center','¡La liquidación se ha generado exitosamente!')
            this.updateLocalStorage()
            this.clearForm()
        },
        clearForm(){
            this.baseSalary = "",
            this.totalSales = ""
        },
        showFormatedNumber(value){
            function thousandSeparator(number = 0, decimalsQuantity = 2) {
                return Number(number).toFixed(decimalsQuantity).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              }
              return thousandSeparator(value)
        },
        calculate() {
          this.baseSalary = this.configAdmin.baseSalarySeller;
          this.totalCommission = (this.totalSales >= 5000000)? this.totalSales * 0.10 : (this.totalSales >= 10000000) ? this.totalSales * 0.20 : 0;
          return this.totalPay = this.baseSalary + this.totalCommission + this.transportSubsidy;
        },        
        fieldValidations(){
            error = false;
            if(this.totalSales === "" || this.totalSales < 0 || typeof this.totalSales  !== "number") {
                this.errorTotalSales = true;
                error = true;
            } else {
                this.errorTotalSales= false;
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
                this.dataSellers.splice(index,1);
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
 
})