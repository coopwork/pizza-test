
export function validation() {
  const validateInputs = document.querySelectorAll('*[data-validate]'),
    methods = {
      "dot in name": {
        errorText: '',
        validator: function (e) {
          let value = e.target.value;
          if (value.includes('.')) {
            e.target.value = value.replace('.', '');
          }
        }
      },
      "min length": {
        errorText: 'Имя должно содержать минимум 2 символа',
        validator: function (e) {
          const params = e.target.getAttribute('data-validate').split(',')
          let
            value = e.target.value,
            keyValue;

          params.forEach(param => {
            if (param.includes('min length'))
              keyValue = +param.split(':')[1].trim();
          });


          if (value.length < keyValue) {
            if (e.target.parentElement.className.includes('input__wrapper')) {
              e.target.parentElement.setAttribute('data-error', this.errorText)
            }
            e.target.setAttribute('data-error', this.errorText)
          } else {
            e.target.removeAttribute('data-error')
            e.target.parentElement.removeAttribute('data-error')
          }
        }
      },
      "phone mask": {
        errorText: 'Не является номером телефона',
        validator: function (e) {
          let input = e.target.value.replace(/\D/g, '');
          if (input.length > 11) input = input.substring(0, 11);

          let formatted = '+7 ';
          switch (true) {
            case input.length > 1:
              formatted += '(' + input.substring(1, 4);
            case input.length >= 4:
              formatted += ') ' + input.substring(4, 7);
            case input.length >= 7:
              formatted += ' ' + input.substring(7, 9);
            case input.length >= 9:
              formatted += ' ' + input.substring(9, 11);
          }

          e.target.value = formatted;
        }
      }
    };

  Object.keys(methods).forEach(key => {
    if (methods[key].validator) {
      methods[key].validator = methods[key].validator.bind(methods[key]);
    }
  });

  try {
    validateInputs.forEach(input => {
      const params = input
        .getAttribute('data-validate')
        .split(',');

      params.forEach(param => {
        const
          paramDetails = param.trim().split(':'),
          validatorKey = paramDetails[0].trim();

        if (methods[validatorKey] && methods[validatorKey].validator) {
          input.addEventListener('input', methods[validatorKey].validator);
        } else {
          console.error(`Validator ${validatorKey} is not defined`);
        }

      });
    });
  } catch (error) {
    console.error('error validating  inputs:', error);
  }
}
