sap.ui.define([
    'class9/controller/baseController','sap/m/MessageBox','sap/m/MessageToast','sap/ui/core/Fragment'], 
    function(baseController,MessageBox,MessageToast,Fragment) {
    'use strict';
    return baseController.extend("class9.controller.Add",{

        onInit: function(){
var oModel = new sap.ui.model.json.JSONModel();
  oModel.setData({
       "productData":{
           "PRODUCT_ID":"",
           "TYPE_CODE":"PR",
           "CATEGORY":"",
           "NAME":"",
           "DESCRIPTION":"",
           "SUPPLIER_ID":"0100000051",
           "SUPPLIER_NAME":"TECUM",
           "PRICE":"",
           "CURRENCY_CODE":"INR"
       }
  });
  this.getView().setModel(oModel, "local");
    },
    mode: "create",
    productId: "",
  onSave: function(){
      var oModel = this.getView().getModel("local");
      var payload = oModel.getProperty("/productData");
      //Check
      if(payload.PRODUCT_ID === ""){
          MessageBox.error("Please enter product ID");
          return;
      } 

      var oDataModel = this.getView().getModel();
if(this.mode === 'create'){
  oDataModel.create("/ProductSet", payload, {
    success: function(data){
      MessageToast.show("Data sucessfully SAVED");
    },
    error: function(oErr){
      MessageBox.error("Data not SAVED");
    }
});

} 
if(this.mode === 'update'){

  var oKey = this.productId;
  oDataModel.update(oKey, payload, {
    success: function(data){
      MessageToast.show("Data sucessfully updated");
    },
    error: function(oErr){
      MessageBox.error("Data not updated");
    }
});
}


  },

  onChange: function(oEvent) {
    debugger;
    var oValue = oEvent.getParameter("value");
    //GET ODATA Model
    var oData = this.getView().getModel();
    var that = this;
    //read odata by property
    var oProp = `/ProductSet('${oValue}')`;
    oData.read(oProp, {
      success: function(data){
        var oLocal = that.getView().getModel("local");
        oLocal.setProperty("/productData", data);
        // MessageToast.show("Data sucessfully SAVED");
        that.mode = "update";
        that.productId = oProp;
        var oButton = that.getView().byId("idSave");
        oButton.setText("Update");
      },
      error: function(oErr){
        var oModel = that.getView().getModel("local").getProperty("/productData");
        if(!oModel.PRODUCT_ID === ""){
          MessageBox.error("Data not SAVED");
        }
        
      }
    });
  },
  onClear: function() {
    this.mode = "create";
    var oButton = this.getView().byId("idSave");
        oButton.setText("Create");

        var oModel = new sap.ui.model.json.JSONModel();
        oModel.setData({
             "productData":{
                 "PRODUCT_ID":"",
                 "TYPE_CODE":"PR",
                 "CATEGORY":"",
                 "NAME":"",
                 "DESCRIPTION":"",
                 "SUPPLIER_ID":"0100000051",
                 "SUPPLIER_NAME":"TECUM",
                 "PRICE":"",
                 "CURRENCY_CODE":"INR"
             }
        });    
        this.getView().setModel(oModel, "local");
  },
  onDelete: function(){
    var oProduct = this.getView().getModel("local").getProperty("/productData").PRODUCT_ID;
    var oKey = `/ProductSet('${oProduct}')`;
    var that = this;
    if (oProduct !== "") {
      var oData = this.getView().getModel();
      oData.remove(oKey,{
        success: function(oEvent) {
          that.onClear();
          MessageToast.show("Data sucessfully deleted");
        },
        error: function(oError) {
          
          MessageToast.show("Data not deleted");
        }
      });
    }
  },
  cities:null,
  f4field:null,
  onF4help: function (params) {
    this.f4field = params.getSource();

        // MessageBox.confirm("onF4help Work is in progress");
       var that = this;
       if(!this.cities){
        Fragment.load({
            name:"class9.fragments.dialog",
            type:"",
            id:"bp",
            controller: this 
           }).then(
            function(oCities){
                that.cities = oCities;
                       that.getView().addDependent(that.cities);
                       that.cities.bindAggregation("items",{
                        path:"/SupplierSet",
                        template: new sap.m.DisplayListItem({
                           label: "{BP_ID}",
                           value: "{COMPANY_NAME}"
                        })
                    });
                    that.cities.open();
            }
           );
       }else{
           that.cities.open();
    }
       
    },
 
    onConfirm: function (oEvent) {
        var oId = oEvent.getSource().getId();
        if(oId==='bp--dialog'){
       var oSelectedItem = oEvent.getParameter("selectedItem");
       var sText = oSelectedItem.getLabel();
      //  this.f4field.setValue(sText);
       this.getView().getModel("local").setProperty("/productData/SUPPLIER_ID", sText);
       this.getView().getModel("local").setProperty("/productData/SUPPLIER_NAME", oSelectedItem.getValue());
        }
    },
    onGetMost: function(){
      var that = this;
      var oDataModel = this.getView().getModel();
      var oCat = this.getView().getModel("local").getProperty("/productData/CATEGORY");
      oDataModel.callFunction("/GetMostExpensiveProduct",{
        urlParameters: {
          "I_CATEGORY": oCat
        },
        success: function(data){
          var oLocal = that.getView().getModel("local");
          // var oDataModel = that.getView().getModel();
          oLocal.setProperty("/productData", data);
          // if(!data){
          //   // var oProduct = `ProductSet('${data}')`;
          //   this.onChange(data);
          // }
        }
      });
    }

    });
});