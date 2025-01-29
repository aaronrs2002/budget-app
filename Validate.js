const Validate = (fields) => {
    const numOnly = /^[0-9.-]+$/;


    if (document.querySelectorAll(".error"))
        [].forEach.call(document.querySelectorAll(".error"), function (e) {
            e.classList.remove("error");
        });

    for (let i = 0; i < fields.length; i++) {
        var value,
            element = document.querySelector("[name='" + fields[i] + "']");
        if (element != null) {
            value = element.value;
        } else {
            value = "";
        }


        if (value === "" || value === "default") {
            document.querySelector("[name='" + fields[i] + "']")
                .classList.add("error");
        } else {
            document
                .querySelector("[name='" + fields[i] + "']")
                .classList.remove("error");
        }

        if (fields[i] === "email" || fields[i] === "guestEmailSearch") {
            const email = document.querySelector("[name='" + fields[i] + "']").value;
            var atpos = email.indexOf("@");
            var dotpos = email.lastIndexOf(".");
            if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= email.length) {
                document
                    .querySelector("[name='" + fields[i] + "']")
                    .classList.add("error");
            } else {
                document
                    .querySelector("[name='" + fields[i] + "']")
                    .classList.remove("error");
            }
        }


        //NAUMBERS ONLY 
        const numRequired = ["itemAmount"];
        for (let j = 0; j < numRequired.length; j++) {
            if (fields[i] === numRequired[j]) {
                let value = document.querySelector("[name='" + fields[i] + "']").value;
                if (!value.match(numOnly)) {
                    document.querySelector("[name='" + fields[i] + "']").classList.add("error");
                }
            }
        }

        const isCurrency = ["price", "supportRate", "developementRate", "amount-in", "amount-out"];
        let cost = document.querySelector("[name='" + fields[i] + "']").value * 100;
        if (isCurrency.indexOf(fields[i]) !== -1) {
            cost = Math.round(cost);
            if (Number.isInteger(cost)) {
            } else {
                document.querySelector("[name='" + fields[i] + "']").classList.add("error");
            }

        }
    }



    /*//ONLY IF QUILL IS INSTALLED
    if (document.querySelector(".error")) {
      document.querySelector("button.ckValidate").disabled = true;
      return false;
    } else {
      document.querySelector("button.ckValidate").disabled = false;
    }*/
};

//export default Validate;
