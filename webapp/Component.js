sap.ui.define([
    'sap/ui/core/UIComponent'
], function(UIComponent) {
    'use strict';
    return UIComponent.extend("class9.Component",{
        metadata: {
            manifest: "json"
        },
       init: function(){
           //call the base class constructor from child class
           UIComponent.prototype.init.apply(this);
           //get the router objectfrom the base class
           var oRouter = this.getRouter();
           //Call the initialize method of router
           oRouter.initialize();
       },
    //    createContent: function(){ 
    //        var oView = new sap.ui.view({
    //            viewName: "class9.view.App",
    //            type: "XML"
    //        });
    //        var oView1 = new sap.ui.view({
    //         viewName: "class9.view.View1",
    //         type: "XML",
    //         id: "idView1"
    //     });
    //     var oView2 = new sap.ui.view({
    //         viewName: "class9.view.View2",
    //         type: "XML",
    //         id: "idView2"
    //     });
    //     var oAppCon = oView.byId("container");
    //     oAppCon.addMasterPage(oView1);
    //     oAppCon.addDetailPage(oView2);
        
    //     return oView;

    //    },
       destroy: function(){

       }
    });
});