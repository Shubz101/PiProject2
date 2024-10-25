boxes.forEach(function(id, index) {
        var box = document.getElementById(id);
        var input = document.getElementById(inputs[index]);
        if (id === boxId) {
          if (input.classList.contains('hidden')) {
            input.classList.remove('hidden');
          } else {
            input.classList.add('hidden');
          }
        } else {
          input.classList.add('hidden');
        }
      });
    }

    document.getElementById('paypal-box').addEventListener('click', function() {
      toggleBox('paypal-box', 'paypal-input');
    });

    document.getElementById('googlepay-box').addEventListener('click', function() {
      toggleBox('googlepay-box', 'googlepay-input');
    });

    document.getElementById('applepay-box').addEventListener('click', function() {
      toggleBox('applepay-box', 'applepay-input');
    });

    document.getElementById('mastercard-box').addEventListener('click', function() {
      toggleBox('mastercard-box', 'mastercard-input');
    });
  </script>
</body>
</html>
