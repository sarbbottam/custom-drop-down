YUI.add("mobile-number-formatter",function(a){a.use("input-data-formatter",function(a){var b=new a.InputDataModifier.InputDataFormatter;a.all("[data-format]").each(function(a){b.formatter(a)}),a.all("[custom-drop-down-type=country-code]").each(function(a){b.updateFormat(a)}),a.on("change",function(a){b.updateFormat(a.target)},"[custom-drop-down-type=country-code]")})});