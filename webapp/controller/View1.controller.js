sap.ui.define([
    'class9/controller/baseController','sap/ui/model/Filter','sap/ui/model/FilterOperator'], 
    function(baseController,Filter,FilterOperator) {
    'use strict';
    return baseController.extend("class9.controller.View1",{
      onInit: function(){
        this.oRouter = this.getOwnerComponent().getRouter();
        
      },
      onSecond: function(sIndex){
        debugger;
        this.oRouter = this.getOwnerComponent().getRouter();
        
        this.oRouter.navTo("appHome2",{
          "fruitId": sIndex 
        });
         this.oRouter.getRoute("appHome2").attachMatched(this.selected, this);
        


        // var oAppCon = this.getView().getParent();
        // var oView2 = oAppCon.getPage("idView2");
        // oAppCon.to("idView2");
      },
      selected: function(oEvent) {
        debugger;
        var fruitId = oEvent.getParameter("arguments").fruitId;
        var oList = this.getView().byId("l1");
        oList.setSelectedItem(oList.getItems()[PRODUCT_ID]);
      },

      onDelete: function(oEvent){
          var oListitem = oEvent.getParameter("listItem");
          //var oList = this.getView().byId("l1");
          var oList = oEvent.getSource();
          oList.removeItem(oListitem);
      },
      onSearch: function(oEvent){
        
        //get the details of search data
          var oQuery = oEvent.getParameter("query");  
        //get the list item by id . note: we can not use getSource this event trigger by the event of serch
        var oList = this.getView().byId("l1");
        //Create filter object
        var oFilter1 =  new Filter( 
          "name",
          FilterOperator.Contains,
          oQuery
        );
        var oFilter2 =  new Filter( 
          "type",
          FilterOperator.Contains,
          oQuery
        );
        var oFilter = new Filter({
          filters: [oFilter1,oFilter2],
          and: false
        });

        //inject the filter oject to the list item
        oList.getBinding("items").filter(oFilter);
      },

      onSelect: function(oEvent){
        debugger;
         var oSelectedLine = oEvent.getParameter("listItem").getBindingContextPath();
        //  var oView2 = this.getView().getParent().getParent().getPage(View2);
        //  oView2.bindElement(oSelectedLine);
        
        var sIndex = oSelectedLine.split("/")[oSelectedLine.split("/").length - 1];

         this.onSecond(sIndex);

      },
      onAdd: function(){
this.oRouter.navTo("addNew");
      }
    
    });
});