sap.ui.define([
    'class9/controller/baseController','sap/m/MessageBox','sap/ui/core/Fragment', 'sap/ui/model/Filter', 'sap/ui/model/FilterOperator'], 
    function(baseController,MessageBox,Fragment,Filter,FilterOperator) {
    'use strict';
    return baseController.extend("class9.controller.View2",{
        
        onInit: function(params){
            debugger;
            this.oRouter = this.getOwnerComponent().getRouter();
            this.oRouter.getRoute("appHome2").attachMatched(this.herculis, this);
            
        },
        herculis: function(oEvent){
            debugger;
            var fruitId = oEvent.getParameter("arguments").fruitId;
            var sPath = '/' + fruitId;
            this.getView().bindElement(sPath);
        },
        onBack: function(){
            //Step 1: Get The Container Control object here
            var oAppCon = this.getView().getParent();
            //Step 2: Container will navigate to next view
            oAppCon.to("idView1");
        },
        onSave: function(){
            MessageBox.confirm("Do you want save ?",{
            onClose: function(oStatus){
             if (oStatus === "OK"){
                 
             }
            }
            });
        },
        onCancel: function(){
            MessageBox.error("Order Cancled");
        },
        oSupplierPopup: null,
        onFilter: function (params) {
           var that = this;
            if(!this.oSupplierPopup){
                Fragment.load({
                    name:"class9.fragments.dialog",
                    type:"",
                    id:"supplier",
                    controller: this
                }).then(function(oFragment){
                    that.oSupplierPopup = oFragment;
                    that.getView().addDependent(that.oSupplierPopup);
                    that.oSupplierPopup.setTitle("Supplier");
                    that.oSupplierPopup.bindAggregation("items",{
                        path:"/suppliers",
                        template: new sap.m.DisplayListItem({
                           label: "{name}",
                           value: "{city}"
                        })
                    });
                });
            }
            that.oSupplierPopup.open();
            // MessageBox.confirm("onFilter Work is in progress");
            
        },
        cities: null,
        f4field:null,
        onF4help: function (params) {
        this.f4field = params.getSource();

            // MessageBox.confirm("onF4help Work is in progress");
           var that = this;
           if(!this.cities){
            Fragment.load({
                name:"class9.fragments.dialog",
                type:"",
                id:"city",
                controller: this 
               }).then(
                function(oCities){
                    that.cities = oCities;
                           that.getView().addDependent(that.cities);
                           that.cities.bindAggregation("items",{
                            path:"/cities",
                            template: new sap.m.DisplayListItem({
                               label: "{name}",
                               value: "{city}"
                            })
                        });
                        that.cities.open();
                }
               );
           }else{
               that.cities.open();
        }
           
        },
        // city: function(oCities){
        //     that.cities = Cities;
        //            that.getView().addDependent(that.cities);
        //            that.cities.bindAggregation("items",{
        //             path:"/suppliers",
        //             template: new sap.m.DisplayListItem({
        //                label: "{name}",
        //                value: "{city}"
        //             })
        //         });
        //         that.cities.open();
        // },
        onConfirm: function (oEvent) {
            var oId = oEvent.getSource().getId();
            if(oId==='city--dialog'){
           var oSelectedItem = oEvent.getParameter("selectedItem");
           var sText = oSelectedItem.getLabel();
           this.f4field.setValue(sText);
            }
        },
        onSearch: function(oEvent){
            debugger;
          var oValue = oEvent.getParameter("value");
          var oSource = oEvent.getSource();
          var oFilter = new Filter(
            "name",
            FilterOperator.Contains,
            oValue,
          );
          oSource.getBinding("items").filter(oFilter);

        }


    });
});