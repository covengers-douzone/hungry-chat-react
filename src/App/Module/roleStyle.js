export default  function () {
    return {
         opacity: function () {
             let opacity
             (localStorage.getItem("role") === "ROLE_UNKNOWN") ? opacity = {opacity : 0.2} : opacity = {opacity : 1.0}
              return opacity
         }
    }

}

