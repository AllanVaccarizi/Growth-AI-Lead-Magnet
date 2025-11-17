// Calculatrice ROI Automatisation - Version 2 étapes
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
            box-shadow: 5px 0 15px 0 #e2bc36, 5px 2px 15px 0 #e2bc36;
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
        
        .roi-calculator .form-group.full-width {
            flex: 1 1 100%;
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
        .roi-calculator input[type="number"],
        .roi-calculator input[type="text"] {
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
        
        .roi-calculator .checkbox-container {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-top: 15px;
            cursor: pointer;
        }
        
        .roi-calculator input[type="checkbox"] {
            width: 20px;
            height: 20px;
            min-height: 20px;
            cursor: pointer;
            accent-color: #c1a53a;
        }
        
        .roi-calculator .checkbox-container label {
            margin: 0;
            cursor: pointer;
            white-space: normal;
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
        
        .roi-calculator .button-vortex-blur:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }
        
        .roi-calculator .button-vortex-blur:disabled:hover .button-vortex-blur__container {
            transform: none;
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
                flex-direction: column;
            }
            
            .roi-calculator .details-btn,
            .roi-calculator .cta-btn {
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
            
            <!-- ÉTAPE 1 : Informations sur la tâche -->
            <div class="form-container" id="step1Container">
                <form id="step1Form">
                    <div class="form-row">
                        <div class="form-group">
                            <label for="task">Tâche à automatiser</label>
                            <select id="task" required>
                                <option value="">Sélectionnez une tâche</option>
                                <option value="Saisie CRM">Saisie CRM</option>
                                <option value="Qualification des leads">Qualification des leads</option>
                                <option value="Saisie de factures">Saisie de factures</option>
                                <option value="Envoi d'emails de prospection">Envoi d'emails de prospection</option>
                                <option value="Réponses emails support client">Réponses emails support client</option>
                                <option value="Rédaction d'articles de blog">Rédaction d'articles de blog</option>
                                <option value="Publication sur réseaux sociaux">Publication sur réseaux sociaux</option>
                                <option value="Autre">Autre</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label for="hoursPerWeek">Heures par semaine</label>
                            <input type="number" id="hoursPerWeek" min="0.5" max="80" step="0.5" required placeholder="Ex: 5">
                        </div>
                        
                        <div class="form-group">
                            <label for="employees">Nombre de collaborateurs</label>
                            <input type="number" id="employees" min="1" max="100" required placeholder="Ex: 2">
                        </div>
                        
                        <div class="form-group button-group">
                            <label>&nbsp;</label>
                            <button type="submit" class="button-vortex-blur">
                                <div class="button-vortex-blur__container">
                                    Continuer
                                </div>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            
            <!-- ÉTAPE 2 : Informations salariales -->
            <div class="form-container hidden" id="step2Container">
                <form id="step2Form">
                    <div class="form-row">
                        <div class="form-group full-width">
                            <label for="salary">Salaire brut annuel moyen (€)</label>
                            <input type="number" id="salary" min="15000" max="200000" placeholder="Ex: 30000">
                        </div>
                    </div>
                    
                    <div class="checkbox-container">
                        <input type="checkbox" id="noSalaryInfo">
                        <label for="noSalaryInfo">Je ne dispose pas de cette information</label>
                    </div>
                    
                    <div class="form-row" style="margin-top: 20px;">
                        <div class="form-group button-group" style="flex: 1;">
                            <button type="submit" class="button-vortex-blur">
                                <div class="button-vortex-blur__container">
                                    Calculer le résultat
                                </div>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            
            <!-- Résumé du résultat sur une ligne -->
            <div id="resultSummary" class="result-summary">
                <div class="cost-summary">
                    <div class="cost-label" id="resultLabel"></div>
                    <div class="cost-value" id="costValue"></div>
                </div>
                <div class="result-buttons">
                    <button class="details-btn" id="detailsBtn">
                        <div class="details-btn__container">
                            Voir les détails
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
                    <h3 id="automationMessageTitle"></h3>
                    <p id="automationMessageText"></p>
                </div>
            </div>
        </div>
    `;
    
    // Insert HTML
    container.innerHTML = html;
    
    // JavaScript Functionality
    
    // Variables globales pour stocker les données de l'étape 1
    let step1Data = {};
    
    // Gestion de la soumission de l'étape 1
    document.getElementById('step1Form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Stocker les données
        step1Data = {
            task: document.getElementById('task').value,
            taskName: document.getElementById('task').options[document.getElementById('task').selectedIndex].text,
            hoursPerWeek: parseFloat(document.getElementById('hoursPerWeek').value),
            employees: parseInt(document.getElementById('employees').value)
        };
        
        // Masquer l'étape 1 et afficher l'étape 2
        document.getElementById('step1Container').classList.add('hidden');
        document.getElementById('step2Container').classList.remove('hidden');
    });
    
    // Gestion de la checkbox "Je ne dispose pas de cette information"
    document.getElementById('noSalaryInfo').addEventListener('change', function() {
        const salaryInput = document.getElementById('salary');
        if (this.checked) {
            salaryInput.value = '';
            salaryInput.disabled = true;
            salaryInput.required = false;
        } else {
            salaryInput.disabled = false;
            salaryInput.required = true;
        }
    });
    
    // Gestion de la soumission de l'étape 2
    document.getElementById('step2Form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const noSalaryInfo = document.getElementById('noSalaryInfo').checked;
        const salary = document.getElementById('salary').value;
        
        // Validation : soit le salaire est renseigné, soit la case est cochée
        if (!noSalaryInfo && !salary) {
            alert('Veuillez renseigner un salaire ou cocher la case "Je ne dispose pas de cette information"');
            return;
        }
        
        // Calculs de base
        const totalWeeklyHours = step1Data.hoursPerWeek * step1Data.employees;
        const annualHours = step1Data.hoursPerWeek * 52;
        const totalAnnualHours = annualHours * step1Data.employees;
        
        // Masquer l'étape 2
        document.getElementById('step2Container').classList.add('hidden');
        
        // Afficher le résumé
        document.getElementById('resultSummary').style.display = 'flex';
        
        let calculationStepsHTML = '';
        let automationTitle = '';
        let automationText = '';
        
        if (noSalaryInfo) {
            // Affichage en heures
            document.getElementById('resultLabel').textContent = 'Temps Total Perdu';
            document.getElementById('costValue').textContent = `${totalAnnualHours.toLocaleString('fr-FR')} heures/an`;
            
            calculationStepsHTML = `
                <div class="calculation-step">• Tâche : ${step1Data.taskName}</div>
                <div class="calculation-step">• Temps par semaine : ${step1Data.hoursPerWeek}h × ${step1Data.employees} collaborateur(s) = ${totalWeeklyHours}h/semaine</div>
                <div class="calculation-step">• Temps par personne et par an : ${step1Data.hoursPerWeek}h × 52 semaines = ${annualHours}h/an</div>
                <div class="calculation-step">• <strong>Temps total perdu annuellement : ${totalAnnualHours.toLocaleString('fr-FR')} heures/an</strong></div>
            `;
            
            automationTitle = '⏰ Récupérez un temps précieux';
            automationText = `Chaque année, votre équipe consacre ${totalAnnualHours.toLocaleString('fr-FR')} heures à cette tâche répétitive. En l'automatisant, vous libérez ce temps pour des activités à forte valeur ajoutée : développement commercial, innovation, relation client premium, stratégie... L'automatisation transforme le temps perdu en opportunités de croissance !`;
            
        } else {
            // Affichage en coût
            const salaryValue = parseInt(salary);
            const hourlyRate = salaryValue / 1820;
            const annualCost = totalAnnualHours * hourlyRate;
            
            document.getElementById('resultLabel').textContent = 'Coût Total Annuel';
            document.getElementById('costValue').textContent = new Intl.NumberFormat('fr-FR', {
                style: 'currency',
                currency: 'EUR',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            }).format(annualCost) + '/an';
            
            calculationStepsHTML = `
                <div class="calculation-step">• Tâche : ${step1Data.taskName}</div>
                <div class="calculation-step">• Temps par semaine : ${step1Data.hoursPerWeek}h × ${step1Data.employees} collaborateur(s) = ${totalWeeklyHours}h/semaine</div>
                <div class="calculation-step">• Temps annuel : ${step1Data.hoursPerWeek}h × 52 semaines = ${annualHours}h/an par personne</div>
                <div class="calculation-step">• Taux horaire : ${salaryValue.toLocaleString('fr-FR')}€ ÷ 1820h = ${hourlyRate.toFixed(2)}€/h</div>
                <div class="calculation-step">• <strong>Coût total : ${totalAnnualHours}h × ${hourlyRate.toFixed(2)}€ = ${annualCost.toLocaleString('fr-FR', {maximumFractionDigits: 0})}€/an</strong></div>
            `;
            
            automationTitle = '🚀 Libérez votre potentiel avec l\'automatisation';
            automationText = `Cette tâche répétitive vous coûte ${new Intl.NumberFormat('fr-FR', {style: 'currency', currency: 'EUR', minimumFractionDigits: 0, maximumFractionDigits: 0}).format(annualCost)} par an. En l'automatisant, vos collaborateurs pourront se concentrer sur des activités à forte valeur ajoutée : développement commercial, innovation, relation client premium, stratégie... L'automatisation n'est pas juste une économie, c'est un investissement dans la croissance de votre entreprise !`;
        }
        
        // Remplir les détails
        document.getElementById('calculationSteps').innerHTML = calculationStepsHTML;
        document.getElementById('automationMessageTitle').textContent = automationTitle;
        document.getElementById('automationMessageText').textContent = automationText;
    });
    
    // Gestion du bouton Détails
    document.getElementById('detailsBtn').addEventListener('click', function() {
        const resultDetails = document.getElementById('result');
        const buttonContainer = this.querySelector('.details-btn__container');
        if (resultDetails.style.display === 'block') {
            resultDetails.style.display = 'none';
            buttonContainer.textContent = 'Voir les détails';
        } else {
            resultDetails.style.display = 'block';
            buttonContainer.textContent = 'Masquer les détails';
            resultDetails.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
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