// Calculatrice ROI Automatisation - Version Complète avec nouveaux styles inputs
// Ajoutez ce script à votre page HTML

function createROICalculator(containerId) {
    const container = document.getElementById(containerId);
    
    // CSS Styles
    const styles = `
        <style>
        .roi-calculator {
            background: #000000;
            color: white;
            font-family: 'Archivo', sans-serif;
            border: 2px solid #c1a53a;
            border-radius: 15px;
            padding: 30px;
            max-width: 1200px;
            width: 100%;
            box-shadow: 0 10px 30px rgba(193, 165, 58, 0.2);
            box-sizing: border-box;
        }
        
        .roi-calculator h1 {
            font-family: 'Outfit', sans-serif;
            font-weight: 500;
            font-size: 2em;
            text-align: center;
            margin-bottom: 8px;
            color: #c1a53a;
        }
        
        .roi-calculator .subtitle {
            text-align: center;
            margin-bottom: 30px;
            color: #cccccc;
            font-size: 1em;
        }
        
        .roi-calculator .form-container {
            transition: all 0.5s ease;
        }
        
        .roi-calculator .form-container.hidden {
            display: none;
        }
        
        .roi-calculator .form-row {
            display: flex;
            gap: 15px;
            align-items: flex-end;
            flex-wrap: wrap;
        }
        
        .roi-calculator .form-group {
            flex: 1;
            min-width: 180px;
            display: flex;
            flex-direction: column;
        }
        
        .roi-calculator .form-group.button-group {
            flex: 0 0 auto;
            min-width: 200px;
        }
        
        .roi-calculator label {
            margin-bottom: 8px;
            font-weight: 500;
            color: white;
            font-size: 0.9em;
            white-space: nowrap;
        }
        
        .roi-calculator select, 
        .roi-calculator input {
            width: 100%;
            height: auto;
            min-height: 2.75rem;
            margin-bottom: 0px;
            padding: 0.5rem 0.75rem;
            border-style: solid;
            border-width: 2px;
            border-color: rgba(231, 191, 38, 0.4);
            border-radius: 8px;
            background-color: rgba(231, 191, 38, 0.2);
            backdrop-filter: blur(30px);
            font-family: 'Outfit', sans-serif;
            color: #ffffff;
            font-size: 1rem;
            line-height: 1.6;
            font-weight: 400;
            box-sizing: border-box;
            transition: all 0.3s ease;
        }
        
        .roi-calculator select:focus, 
        .roi-calculator input:focus {
            outline: none;
            border-color: #ffffff;
            background-color: rgba(190, 169, 88, 0.2);
        }
        
        .roi-calculator input::placeholder {
            color: rgba(255, 255, 255, 0.5);
        }
        
        .roi-calculator select option {
            background-color: #2a2a2a;
            color: #ffffff;
            padding: 8px;
        }
        
        .roi-calculator #customHoursGroup {
            display: none;
            margin-top: 20px;
        }
        
        .roi-calculator .button-vortex-blur {
            position: relative;
            color: rgb(249, 244, 235);
            font-size: 1.125rem;
            line-height: 1em;
            letter-spacing: -0.04em;
            text-decoration: none;
            z-index: 10;
            user-select: none;
            display: grid;
            width: 100%;
            border: none;
            background: transparent;
            cursor: pointer;
            font-family: 'Outfit', sans-serif;
            font-weight: 500;
            margin: 0;
            padding: 0;
        }
        
        .roi-calculator .button-vortex-blur__container {
            display: flex;
            padding: 12px 20px;
            justify-content: center;
            align-items: center;
            gap: 0.75rem;
            border-style: solid;
            border-width: 1.5px;
            border-color: rgb(218, 196, 129);
            border-radius: 8px;
            background-color: rgba(193, 165, 58, 0.05);
            box-shadow: 0 2px 5px 0 hsla(47, 80%, 53%, 0.39), 
                        inset 0 -8px 32px 0 rgba(193, 165, 58, 0.2);
            grid-area: 1 / 1;
            transition: all 0.3s ease;
            height: 48px;
            box-sizing: border-box;
        }
        
        .roi-calculator .button-vortex-blur:hover .button-vortex-blur__container {
            background-color: rgba(193, 165, 58, 0.1);
            box-shadow: 0 4px 10px 0 hsla(47, 80%, 53%, 0.5), 
                        inset 0 -12px 40px 0 rgba(193, 165, 58, 0.3);
            transform: translateY(-1px);
        }
        
        /* Résultat sur une ligne */
        .roi-calculator .result-summary {
            display: none;
            background: rgba(160, 160, 160, 0.3);
            border-radius: 12px;
            padding: 20px;
            margin-top: 20px;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 15px;
        }
        
        .roi-calculator .cost-summary {
            display: flex;
            flex-direction: column;
            gap: 5px;
        }
        
        .roi-calculator .cost-label {
            font-size: 0.9em;
            color: #cccccc;
            font-family: 'Archivo', sans-serif;
        }
        
        .roi-calculator .cost-value {
            font-size: 2.2em;
            font-weight: 500;
            color: white;
            font-family: 'Outfit', sans-serif;
        }
        
        .roi-calculator .result-buttons {
            display: flex;
            gap: 10px;
            align-items: center;
        }
        
        .roi-calculator .details-btn, 
        .roi-calculator .cta-btn {
            position: relative;
            color: rgb(249, 244, 235);
            font-size: 0.95rem;
            line-height: 1em;
            letter-spacing: -0.04em;
            text-decoration: none;
            z-index: 10;
            user-select: none;
            display: grid;
            border: none;
            background: transparent;
            cursor: pointer;
            font-family: 'Archivo', sans-serif;
            font-weight: 400;
            margin: 0;
            padding: 0;
        }
        
        .roi-calculator .details-btn__container, 
        .roi-calculator .cta-btn__container {
            display: flex;
            padding: 12px 20px;
            justify-content: center;
            align-items: center;
            gap: 0.75rem;
            border-style: solid;
            border-width: 1.5px;
            border-radius: 8px;
            grid-area: 1 / 1;
            transition: all 0.3s ease;
            box-sizing: border-box;
        }
        
        .roi-calculator .details-btn__container {
            border-color: rgb(150, 150, 150);
            background-color: rgba(150, 150, 150, 0.05);
            box-shadow: 0 2px 5px 0 hsla(0, 0%, 50%, 0.3), 
                        inset 0 -8px 32px 0 rgba(150, 150, 150, 0.1);
        }
        
        .roi-calculator .details-btn:hover .details-btn__container {
            background-color: rgba(150, 150, 150, 0.1);
            box-shadow: 0 4px 10px 0 hsla(0, 0%, 50%, 0.4), 
                        inset 0 -12px 40px 0 rgba(150, 150, 150, 0.2);
            transform: translateY(-1px);
        }
        
        .roi-calculator .cta-btn__container {
            border-color: rgb(218, 196, 129);
            background-color: rgba(193, 165, 58, 0.05);
            box-shadow: 0 2px 5px 0 hsla(47, 80%, 53%, 0.39), 
                        inset 0 -8px 32px 0 rgba(193, 165, 58, 0.2);
        }
        
        .roi-calculator .cta-btn:hover .cta-btn__container {
            background-color: rgba(193, 165, 58, 0.1);
            box-shadow: 0 4px 10px 0 hsla(47, 80%, 53%, 0.5), 
                        inset 0 -12px 40px 0 rgba(193, 165, 58, 0.3);
            transform: translateY(-1px);
        }
        
        /* Détails complets */
        .roi-calculator .result-container {
            margin-top: 20px;
            padding: 30px;
            background-color: #0d0d0d;
            border: 2px solid #c1a53a;
            border-radius: 10px;
            display: none;
        }
        
        .roi-calculator .result-title {
            font-family: 'Outfit', sans-serif;
            font-weight: 500;
            font-size: 1.8em;
            color: #c1a53a;
            margin-bottom: 20px;
            text-align: center;
        }
        
        .roi-calculator .calculation-details {
            background-color: #1a1a1a;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 25px;
            border-left: 4px solid #c1a53a;
        }
        
        .roi-calculator .calculation-details h3 {
            font-family: 'Outfit', sans-serif;
            font-weight: 500;
            margin-bottom: 15px;
            color: #c1a53a;
        }
        
        .roi-calculator .calculation-step {
            margin-bottom: 8px;
            font-size: 0.95em;
            color: #cccccc;
        }
        
        .roi-calculator .automation-message {
            background: linear-gradient(135deg, rgba(193, 165, 58, 0.1), rgba(212, 184, 77, 0.1));
            padding: 25px;
            border-radius: 8px;
            border: 1px solid rgba(193, 165, 58, 0.3);
        }
        
        .roi-calculator .automation-message h3 {
            font-family: 'Outfit', sans-serif;
            font-weight: 500;
            color: #c1a53a;
            margin-bottom: 15px;
        }
        
        .roi-calculator .automation-message p {
            line-height: 1.6;
            color: #ffffff;
        }
        
        @media screen and (max-width: 768px) {
            .roi-calculator .form-row {
                flex-direction: column;
                gap: 20px;
            }
            
            .roi-calculator .form-group {
                min-width: 100%;
            }
            
            .roi-calculator .result-summary {
                flex-direction: column;
                text-align: center;
            }
            
            .roi-calculator .result-buttons {
                justify-content: center;
                width: 100%;
            }
            
            .roi-calculator h1 {
                font-size: 1.8em;
            }
            
            .roi-calculator .cost-value {
                font-size: 2em;
            }
            
            .roi-calculator label {
                font-size: 1em;
            }
        }
        </style>
    `;
    
    // HTML Structure
    const html = `
        ${styles}
        <div class="roi-calculator">
            <h1>Calculatrice ROI Automatisation</h1>
            <p class="subtitle">Découvrez combien vous coûtent vos tâches répétitives</p>
            
            <div class="form-container" id="formContainer">
                <form id="calculatorForm">
                    <div class="form-row">
                        <div class="form-group">
                            <label for="task">Tâche à automatiser</label>
                            <select id="task" required>
                                <option value="">Sélectionnez une tâche</option>
                                <option value="5">Saisie CRM (5h/semaine)</option>
                                <option value="6">Qualification des leads (6h/semaine)</option>
                                <option value="4">Saisie de factures (4h/semaine)</option>
                                <option value="4">Envoi d'emails de prospection (4h/semaine)</option>
                                <option value="8">Réponses emails support client (8h/semaine)</option>
                                <option value="5">Rédaction d'articles de blog (5h/semaine)</option>
                                <option value="3">Publication sur réseaux sociaux (3h/semaine)</option>
                                <option value="custom">Autre (préciser)</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label for="employees">Nombre de collaborateurs</label>
                            <input type="number" id="employees" min="1" max="100" required placeholder="Ex: 2">
                        </div>
                        
                        <div class="form-group">
                            <label for="salary">Salaire brut annuel (€)</label>
                            <input type="number" id="salary" min="15000" max="200000" required placeholder="Ex: 30000">
                        </div>
                        
                        <div class="form-group button-group">
                            <label>&nbsp;</label>
                            <button type="submit" class="button-vortex-blur">
                                <div class="button-vortex-blur__container">
                                    Calculer le coût annuel
                                </div>
                            </button>
                        </div>
                    </div>
                    
                    <div class="form-group" id="customHoursGroup">
                        <label for="customHours">Nombre d'heures par semaine :</label>
                        <input type="number" id="customHours" min="1" max="40" step="0.5" placeholder="Ex: 3.5">
                    </div>
                </form>
            </div>
            
            <!-- Résumé du résultat sur une ligne -->
            <div id="resultSummary" class="result-summary">
                <div class="cost-summary">
                    <div class="cost-label">Coût Total</div>
                    <div class="cost-value" id="costValue"></div>
                </div>
                <div class="result-buttons">
                    <button class="details-btn" id="detailsBtn">
                        <div class="details-btn__container">
                            Détails
                        </div>
                    </button>
                    <button class="cta-btn" id="ctaBtn">
                        <div class="cta-btn__container">
                            Automatiser cette tâche
                        </div>
                    </button>
                </div>
            </div>
            
            <!-- Détails complets (masqués par défaut) -->
            <div id="result" class="result-container">
                <h2 class="result-title">Détail de votre analyse</h2>
                
                <div class="calculation-details">
                    <h3>Détail du calcul :</h3>
                    <div id="calculationSteps"></div>
                </div>
                
                <div class="automation-message">
                    <h3>Libérez votre potentiel avec l'automatisation</h3>
                    <p>En automatisant cette tâche répétitive, vos collaborateurs pourront se concentrer sur des activités à forte valeur ajoutée : développement commercial, innovation, relation client premium, stratégie... L'automatisation n'est pas juste une économie, c'est un investissement dans la croissance de votre entreprise !</p>
                </div>
            </div>
        </div>
    `;
    
    // Insert HTML
    container.innerHTML = html;
    
    // JavaScript Functionality
    
    // Gestion de l'affichage du champ personnalisé
    document.getElementById('task').addEventListener('change', function() {
        const customGroup = document.getElementById('customHoursGroup');
        const customHours = document.getElementById('customHours');
        
        if (this.value === 'custom') {
            customGroup.style.display = 'block';
            customHours.required = true;
        } else {
            customGroup.style.display = 'none';
            customHours.required = false;
            customHours.value = '';
        }
    });
    
    // Calcul et affichage des résultats
    document.getElementById('calculatorForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const taskSelect = document.getElementById('task');
        const customHours = document.getElementById('customHours');
        const employees = parseInt(document.getElementById('employees').value);
        const salary = parseInt(document.getElementById('salary').value);
        
        // Déterminer les heures par semaine
        let hoursPerWeek;
        let taskName;
        
        if (taskSelect.value === 'custom') {
            hoursPerWeek = parseFloat(customHours.value);
            taskName = 'Tâche personnalisée';
        } else {
            hoursPerWeek = parseFloat(taskSelect.value);
            taskName = taskSelect.options[taskSelect.selectedIndex].text.split(' (')[0];
        }
        
        // Calculs
        const annualHours = hoursPerWeek * 52;
        const hourlyRate = salary / 1820;
        const annualCost = annualHours * hourlyRate * employees;
        
        // Masquer le formulaire et afficher le résumé
        document.getElementById('formContainer').classList.add('hidden');
        document.getElementById('resultSummary').style.display = 'flex';
        
        // Affichage du coût dans le résumé
        document.getElementById('costValue').textContent = 
            new Intl.NumberFormat('fr-FR', {
                style: 'currency',
                currency: 'EUR',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            }).format(annualCost) + '/an';
        
        // Préparer les détails (masqués)
        document.getElementById('calculationSteps').innerHTML = `
            <div class="calculation-step">• Tâche : ${taskName}</div>
            <div class="calculation-step">• Temps par semaine : ${hoursPerWeek}h × ${employees} collaborateur(s) = ${hoursPerWeek * employees}h/semaine</div>
            <div class="calculation-step">• Temps annuel : ${hoursPerWeek}h × 52 semaines = ${annualHours}h/an par personne</div>
            <div class="calculation-step">• Taux horaire : ${salary.toLocaleString('fr-FR')}€ ÷ 1820h = ${hourlyRate.toFixed(2)}€/h</div>
            <div class="calculation-step">• Coût total : ${annualHours}h × ${hourlyRate.toFixed(2)}€ × ${employees} = <strong>${annualCost.toLocaleString('fr-FR', {maximumFractionDigits: 0})}€/an</strong></div>
        `;
    });
    
    // Gestion du bouton Détails
    document.getElementById('detailsBtn').addEventListener('click', function() {
        const resultDetails = document.getElementById('result');
        const buttonContainer = this.querySelector('.details-btn__container');
        if (resultDetails.style.display === 'block') {
            resultDetails.style.display = 'none';
            buttonContainer.textContent = 'Détails';
        } else {
            resultDetails.style.display = 'block';
            buttonContainer.textContent = 'Masquer';
            resultDetails.scrollIntoView({ behavior: 'smooth' });
        }
    });
    
    // Gestion du bouton CTA - PERSONNALISEZ CETTE PARTIE
    document.getElementById('ctaBtn').addEventListener('click', function() {
        // Remplacez par votre URL de contact ou action personnalisée
        window.location.href = '#form';
        // Ou redirigez vers une page : window.location.href = 'https://votre-site.com/contact';
        // Ou déclenchez un événement personnalisé pour votre système
    });
}