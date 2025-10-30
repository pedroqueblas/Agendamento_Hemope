document.addEventListener("DOMContentLoaded", function() {
    const dataInput = document.getElementById("data-agendamento");
    const horaSelect = document.getElementById("hora-agendamento");
    const mensagem = document.getElementById("mensagem");

    dataInput.addEventListener("change", function() {
        const dataSelecionada = this.value;
        if (!dataSelecionada) return;

        horaSelect.innerHTML = '<option value="">Carregando horários...</option>';
        mensagem.textContent = "";

        fetch(`/horarios/${dataSelecionada}/`)
            .then(res => res.json())
            .then(horarios => {
                if (horarios.length === 0) {
                    horaSelect.innerHTML = '<option value="">Nenhum horário disponível</option>';
                    return;
                }
                horaSelect.innerHTML = '<option value="">Selecione o horário</option>';
                horarios.forEach(h => {
                    const option = document.createElement("option");
                    option.value = h.hora;
                    option.textContent = `${h.hora} (${h.vagas} vagas)`;
                    horaSelect.appendChild(option);
                });
            })
            .catch(err => {
                console.error("Erro ao buscar horários:", err);
                horaSelect.innerHTML = '<option value="">Erro ao carregar horários</option>';
            });
    });

    // Submissão do formulário via AJAX
    const form = document.getElementById("form-agendamento");
    form.addEventListener("submit", function(e) {
        e.preventDefault();
        const formData = new FormData(form);

        fetch(form.action, {
            method: "POST",
            body: formData,
            headers: {
                "X-Requested-With": "XMLHttpRequest"
            }
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                mensagem.style.color = "green";
                mensagem.textContent = data.success;
                form.reset();
                horaSelect.innerHTML = '<option value="">Selecione a data primeiro</option>';
            } else if (data.error) {
                mensagem.style.color = "red";
                mensagem.textContent = data.error;
            }
        })
        .catch(err => {
            console.error("Erro no envio do formulário:", err);
            mensagem.style.color = "red";
            mensagem.textContent = "Ocorreu um erro. Tente novamente.";
        });
    });
});
