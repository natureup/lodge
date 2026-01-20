/**
 * Config Loader for Nature Up Health Investor Pitch Deck Website
 *
 * This script loads the config.json file and dynamically populates all website content.
 * To update content, edit config.json - the website will auto-update.
 *
 * ARCHITECTURE:
 * - config.json: Single source of truth for all content and values
 * - index.html: HTML template with placeholder IDs
 * - config-loader.js: This file - loads config and populates HTML
 *
 * All content is abstracted so any changes to config.json automatically reflect on the website.
 */

let CONFIG = {};

// Format currency
function formatCurrency(value) {
    return '$' + value.toLocaleString();
}

// Format percentage
function formatPercent(value) {
    return value + '%';
}

// Load config from JSON file
async function loadConfig() {
    try {
        const response = await fetch('config.json');
        CONFIG = await response.json();
        populateWebsite();
    } catch (error) {
        console.error('Error loading config:', error);
        document.body.innerHTML = '<h1>Error loading configuration</h1><p>Please ensure config.json exists in the same directory.</p>';
    }
}

// Populate all website content
function populateWebsite() {
    populateHeader();
    populateExecutiveSummary();
    populateProblem();
    populateSolution();
    populateMarket();
    populateInvestment();
    populateFinancial();
    populateImpact();
    populateTimeline();
    populateRisks();
    populateTeam();
    populateRegulatory();
    populateFAQ();
    populateFooter();
    setupTabs();
    setupFAQ();
}

// ===== HEADER & FOOTER =====
function populateHeader() {
    document.getElementById('header-company').textContent = CONFIG.company.name;
    document.getElementById('header-tagline').textContent = CONFIG.company.tagline;

    const emailLink = document.getElementById('header-email');
    emailLink.textContent = CONFIG.company.email;
    emailLink.href = `mailto:${CONFIG.company.email}`;

    const phoneLink = document.getElementById('header-phone');
    phoneLink.textContent = CONFIG.company.phone;
    phoneLink.href = `tel:${CONFIG.company.phone.replace(/\./g, '-')}`;
}

function populateFooter() {
    document.getElementById('footer-company').textContent = CONFIG.company.name;
    document.getElementById('footer-contact').innerHTML = `
        <a href="mailto:${CONFIG.company.email}">${CONFIG.company.email}</a> |
        <a href="tel:${CONFIG.company.phone.replace(/\./g, '-')}">${CONFIG.company.phone}</a>
    `;

    const contactBtn = document.getElementById('faq-contact');
    contactBtn.textContent = `Contact: ${CONFIG.company.email}`;
    contactBtn.href = `mailto:${CONFIG.company.email}`;
}

// ===== EXECUTIVE SUMMARY =====
function populateExecutiveSummary() {
    document.getElementById('exec-capital').textContent = formatCurrency(CONFIG.investment.capital_raise.total);
    document.getElementById('exec-return').textContent = formatCurrency(CONFIG.financial.investor_annual_return);
    document.getElementById('exec-annualized').textContent = CONFIG.financial.investor_yield_annualized_7yr;
    document.getElementById('exec-timeline').textContent = '14 months';

    // Why it matters
    const whyList = document.getElementById('exec-why');
    whyList.innerHTML = '';
    const whyPoints = [
        `<strong>${CONFIG.problem.relapse_rate}</strong> ${CONFIG.problem.relapse_description}`,
        `<strong>${CONFIG.problem.crisis_stat}</strong> ${CONFIG.problem.crisis_description}`,
        `Gateway Mountain Center: <strong>${CONFIG.team.operator.years_experience} years</strong> proven experience`
    ];
    whyPoints.forEach(point => {
        const li = document.createElement('li');
        li.innerHTML = point;
        whyList.appendChild(li);
    });

    // Model
    const modelList = document.getElementById('exec-model');
    modelList.innerHTML = '';
    CONFIG.solution.why_it_works.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        modelList.appendChild(li);
    });

    // Milestones table
    const milestonesTable = document.getElementById('exec-milestones');
    milestonesTable.innerHTML = '<thead><tr><th>Milestone</th><th>Target Date</th></tr></thead><tbody>';
    CONFIG.timeline.milestones.slice(0, 8).forEach(m => {
        milestonesTable.innerHTML += `<tr><td>${m.event}</td><td>${m.date}</td></tr>`;
    });
    milestonesTable.innerHTML += '</tbody>';
}

// ===== PROBLEM =====
function populateProblem() {
    document.getElementById('problem-title').textContent = CONFIG.problem.title;
    document.getElementById('problem-crisis').innerHTML = `<strong>${CONFIG.problem.crisis_stat}</strong> ${CONFIG.problem.crisis_description}`;

    // Stats cards
    const statsContainer = document.getElementById('problem-stats');
    statsContainer.innerHTML = '';
    CONFIG.problem.key_stats.forEach(stat => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h4>${stat.label}</h4>
            <p><strong>${stat.value}</strong></p>
            <p>${stat.period}</p>
        `;
        statsContainer.appendChild(card);
    });

    // Gap
    document.getElementById('problem-gap-title').textContent = `The Gap: The Critical ${CONFIG.timeline.milestones[0].description.split('').slice(0, 10).join('')}`;
    document.getElementById('problem-gap-desc').textContent = CONFIG.problem.gap_description;

    // Outcomes
    const outcomesList = document.getElementById('problem-outcomes');
    outcomesList.innerHTML = '';
    [
        'Youth return to same environments and stressors',
        `Relapse is nearly inevitable (${CONFIG.problem.relapse_rate} baseline)`,
        'Re-hospitalization is costly ($150,000+ per stay)',
        'Long-term outcomes worsen with each cycle',
        'Healthcare systems bear the costs; youth and families suffer'
    ].forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        outcomesList.appendChild(li);
    });
}

// ===== SOLUTION =====
function populateSolution() {
    document.getElementById('solution-title').textContent = CONFIG.solution.title;
    document.getElementById('solution-desc').textContent = CONFIG.solution.description;
    document.getElementById('solution-type').textContent = `Program Model: ${CONFIG.solution.program_type}`;

    // Components
    const componentsContainer = document.getElementById('solution-components');
    componentsContainer.innerHTML = '';
    CONFIG.solution.program_components.forEach(comp => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `<h4>${comp.name}</h4><p>${comp.description}</p>`;
        componentsContainer.appendChild(card);
    });

    document.getElementById('solution-secondary').textContent = CONFIG.solution.secondary_revenue;

    // Why it works
    const whyList = document.getElementById('solution-why');
    whyList.innerHTML = '';
    CONFIG.solution.why_it_works.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        whyList.appendChild(li);
    });
}

// ===== MARKET & COMPETITION =====
function populateMarket() {
    document.getElementById('market-addressable').textContent = CONFIG.market.addressable_market;
    document.getElementById('market-addressable-desc').textContent = `Northern California ages ${CONFIG.market.age_range}`;
    document.getElementById('market-population').textContent = `${CONFIG.market.total_youth_population.toLocaleString()} total`;

    // Demand drivers
    const driversListfound = document.getElementById('market-drivers');
    driversListfound.innerHTML = '';
    CONFIG.market.demand_drivers.forEach(driver => {
        const li = document.createElement('li');
        li.textContent = driver;
        driversListfound.appendChild(li);
    });

    // Payer mix table
    const payersTable = document.getElementById('market-payers');
    payersTable.innerHTML = '<thead><tr><th>Payer Source</th><th>%</th><th>Description</th></tr></thead><tbody>';
    CONFIG.market.payer_mix.forEach(payer => {
        payersTable.innerHTML += `<tr><td>${payer.source}</td><td>${payer.percentage}%</td><td>${payer.description}</td></tr>`;
    });
    payersTable.innerHTML += '</tbody>';

    // Competitors
    const competitorsContainer = document.getElementById('market-competitors');
    competitorsContainer.innerHTML = '';
    CONFIG.differentiation.competitors.forEach(comp => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h4>${comp.name}</h4>
            <p><strong>Focus:</strong> ${comp.focus}</p>
            <p><strong>Differentiation:</strong> ${comp.differentiation}</p>
        `;
        competitorsContainer.appendChild(card);
    });

    document.getElementById('market-unique').textContent = CONFIG.differentiation.unique_position;
}

// ===== INVESTMENT =====
function populateInvestment() {
    document.getElementById('investment-structure').textContent = CONFIG.investment.structure;
    document.getElementById('investment-structure-desc').textContent = CONFIG.investment.structure_explanation;

    document.getElementById('inv-total').textContent = formatCurrency(CONFIG.investment.capital_raise.total);
    document.getElementById('inv-minimum').textContent = formatCurrency(CONFIG.investment.capital_raise.minimum_per_investor);

    // Use of funds table
    const useTable = document.getElementById('investment-use');
    useTable.innerHTML = '<thead><tr><th>Category</th><th>Amount</th><th>%</th></tr></thead><tbody>';
    CONFIG.investment.use_of_funds.forEach(fund => {
        const amount = formatCurrency(fund.amount);
        const pct = fund.percentage;
        useTable.innerHTML += `<tr><td>${fund.category}</td><td>${amount}</td><td>${pct}%</td></tr>`;
    });
    useTable.innerHTML += '</tbody>';

    // Why PropCo/OpCo
    const whyList = document.getElementById('investment-why');
    whyList.innerHTML = '';
    CONFIG.investment.why_propco_model.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        whyList.appendChild(li);
    });
}

// ===== FINANCIAL =====
function populateFinancial() {
    document.getElementById('fin-revenue').textContent = formatCurrency(CONFIG.financial.annual_revenue_steady_state);
    document.getElementById('fin-expenses').textContent = formatCurrency(CONFIG.financial.annual_expenses_steady_state);
    document.getElementById('fin-noi').textContent = formatCurrency(CONFIG.financial.annual_noi_steady_state);
    document.getElementById('fin-investor').textContent = `${formatCurrency(CONFIG.financial.investor_annual_return)} (${CONFIG.financial.investor_yield})`;

    // Revenue breakdown
    const revenueTable = document.getElementById('financial-revenue');
    revenueTable.innerHTML = '<thead><tr><th>Revenue Source</th><th>%</th><th>Annual</th></tr></thead><tbody>';
    CONFIG.financial.revenue_breakdown.forEach(rev => {
        const amount = formatCurrency(rev.amount);
        revenueTable.innerHTML += `<tr><td>${rev.source}</td><td>${rev.percentage}%</td><td>${amount}</td></tr>`;
    });
    revenueTable.innerHTML += '</tbody>';

    // 7-year analysis
    document.getElementById('fin-analysis-investment').textContent = formatCurrency(CONFIG.financial.return_analysis.investment);
    document.getElementById('fin-analysis-distributions').textContent = formatCurrency(CONFIG.financial.return_analysis.annual_distributions_years_3_7);
    document.getElementById('fin-analysis-appreciation').textContent = formatCurrency(CONFIG.financial.return_analysis.property_appreciation_7yr);
    document.getElementById('fin-analysis-valuation').textContent = formatCurrency(CONFIG.financial.return_analysis.exit_valuation_year_7);
    document.getElementById('fin-analysis-total').textContent = `${formatCurrency(CONFIG.financial.return_analysis.total_return)} (${CONFIG.financial.return_analysis.total_return_percentage})`;
    document.getElementById('fin-analysis-annualized').textContent = CONFIG.financial.return_analysis.annualized_return;

    document.getElementById('fin-conservative').textContent = `Even at ${CONFIG.financial.utilization_conservative}% utilization (conservative model), investor returns are achieved. Upside if higher utilization is reached.`;
}

// ===== IMPACT =====
function populateImpact() {
    document.getElementById('impact-primary').innerHTML = `Reduce relapse from <strong>${CONFIG.impact.primary_outcome}</strong>`;
    document.getElementById('impact-reporting').textContent = `Quarterly reporting ${CONFIG.impact.reporting_frequency}.`;

    // Clinical outcomes table
    const clinicalTable = document.getElementById('impact-clinical');
    clinicalTable.innerHTML = '<thead><tr><th>Metric</th><th>Target</th><th>Baseline</th></tr></thead><tbody>';
    CONFIG.impact.metrics[0].items.forEach(item => {
        clinicalTable.innerHTML += `<tr><td>${item.metric}</td><td>${item.target}</td><td>${item.baseline}</td></tr>`;
    });
    clinicalTable.innerHTML += '</tbody>';

    // Experience table
    const experienceTable = document.getElementById('impact-experience');
    experienceTable.innerHTML = '<thead><tr><th>Metric</th><th>Target</th></tr></thead><tbody>';
    CONFIG.impact.metrics[1].items.forEach(item => {
        experienceTable.innerHTML += `<tr><td>${item.metric}</td><td>${item.target}</td></tr>`;
    });
    experienceTable.innerHTML += '</tbody>';

    // Provider table
    const providerTable = document.getElementById('impact-provider');
    providerTable.innerHTML = '<thead><tr><th>Metric</th><th>Target</th></tr></thead><tbody>';
    CONFIG.impact.metrics[2].items.concat(CONFIG.impact.metrics[3].items).forEach(item => {
        providerTable.innerHTML += `<tr><td>${item.metric}</td><td>${item.target}</td></tr>`;
    });
    providerTable.innerHTML += '</tbody>';
}

// ===== TIMELINE =====
function populateTimeline() {
    const timelineContainer = document.getElementById('timeline-items');
    timelineContainer.innerHTML = '';

    CONFIG.timeline.milestones.forEach((milestone, index) => {
        const item = document.createElement('div');
        item.className = 'timeline-item';
        item.innerHTML = `
            <div class="timeline-dot">${index + 1}</div>
            <div class="timeline-content">
                <div class="timeline-date">${milestone.date}</div>
                <div class="timeline-title">${milestone.event}</div>
                <p>${milestone.description}</p>
            </div>
        `;
        timelineContainer.appendChild(item);
    });

    // Scenarios table
    const scenariosTable = document.getElementById('timeline-scenarios');
    scenariosTable.innerHTML = '<thead><tr><th>Scenario</th><th>Probability</th><th>Description</th></tr></thead><tbody>';
    CONFIG.timeline.scenarios.forEach(scenario => {
        scenariosTable.innerHTML += `<tr><td>${scenario.name}</td><td>${scenario.probability}%</td><td>${scenario.description}</td></tr>`;
    });
    scenariosTable.innerHTML += '</tbody>';
}

// ===== RISKS =====
function populateRisks() {
    document.getElementById('risks-overview').textContent = CONFIG.risks.overview;

    const risksContainer = document.getElementById('risks-list');
    risksContainer.innerHTML = '';

    CONFIG.risks.major_risks.forEach(risk => {
        const riskDiv = document.createElement('div');
        riskDiv.className = 'risk-item';

        let mitigationHTML = '<strong>Mitigation:</strong><ul>';
        risk.mitigation.forEach(m => {
            mitigationHTML += `<li>${m}</li>`;
        });
        mitigationHTML += '</ul>';

        riskDiv.innerHTML = `
            <div class="risk-rank">#${risk.rank}</div>
            <div class="risk-name">
                <strong>${risk.risk}</strong>
                <p style="margin: 10px 0 0 0; font-size: 0.95em;">${mitigationHTML}</p>
            </div>
            <div class="risk-probability">${risk.probability}</div>
            <div class="risk-impact">${risk.impact}</div>
        `;
        risksContainer.appendChild(riskDiv);
    });
}

// ===== TEAM =====
function populateTeam() {
    document.getElementById('team-founder-name').textContent = CONFIG.team.founder.name;
    document.getElementById('team-founder-title').textContent = CONFIG.team.founder.title;
    document.getElementById('team-founder-bio').textContent = CONFIG.team.founder.bio;

    // Gateway track record
    const trackList = document.getElementById('team-gateway-track');
    trackList.innerHTML = '';
    [
        `${CONFIG.team.operator.years_experience} years continuous programming`,
        `${CONFIG.team.operator.youth_served.toLocaleString()}+ youth served cumulatively`,
        `13 years clinically supervised therapeutic mentoring`,
        `${CONFIG.team.operator.credentials}`,
        'Zero major incidents across 19 years'
    ].forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        trackList.appendChild(li);
    });

    // Gateway expertise
    const expertiseList = document.getElementById('team-gateway-expertise');
    expertiseList.innerHTML = '';
    CONFIG.team.operator.expertise.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        expertiseList.appendChild(li);
    });

    // Why Gateway
    const whyList = document.getElementById('team-gateway-why');
    whyList.innerHTML = '';
    [
        'Proven capability: 19 years of success',
        'Regulatory alignment: Already Medi-Cal certified',
        '19 years of trusted county/hospital relationships',
        'Mission alignment: Nonprofit organization',
        'Stability: Not seeking to exit or sell',
        'Innovation: Pioneered nature-based therapy model'
    ].forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        whyList.appendChild(li);
    });
}

// ===== REGULATORY =====
function populateRegulatory() {
    const permitsTable = document.getElementById('regulatory-permits');
    permitsTable.innerHTML = '<thead><tr><th>Level</th><th>Permit Type</th><th>Timeline</th><th>Status</th></tr></thead><tbody>';

    CONFIG.regulatory.permits.forEach(permit => {
        permitsTable.innerHTML += `
            <tr>
                <td>${permit.level}</td>
                <td>${permit.permit_type}</td>
                <td>${permit.timeline_months} months</td>
                <td>${permit.status}</td>
            </tr>
        `;
    });
    permitsTable.innerHTML += '</tbody>';
}

// ===== FAQ =====
function populateFAQ() {
    const faqContainer = document.getElementById('faq-items');
    faqContainer.innerHTML = '';

    CONFIG.faq.questions.forEach((item, index) => {
        const faqDiv = document.createElement('div');
        faqDiv.className = 'faq-item';
        faqDiv.innerHTML = `
            <div class="faq-question" onclick="toggleFAQ(this)">
                <h4>${item.question}</h4>
                <span class="faq-toggle">+</span>
            </div>
            <div class="faq-answer">
                <p>${item.answer}</p>
            </div>
        `;
        faqContainer.appendChild(faqDiv);
    });
}

// ===== INTERACTIVITY =====
function setupTabs() {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));

            // Add active class
            tab.classList.add('active');
            const sectionId = tab.dataset.section;
            document.getElementById(sectionId).classList.add('active');

            // Scroll to top
            window.scrollTo(0, 0);
        });
    });
}

function setupFAQ() {
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const toggle = this.querySelector('.faq-toggle');

            answer.classList.toggle('open');
            toggle.classList.toggle('open');
        });
    });
}

function toggleFAQ(element) {
    const answer = element.nextElementSibling;
    const toggle = element.querySelector('.faq-toggle');

    answer.classList.toggle('open');
    toggle.classList.toggle('open');
}

function scrollToSection(sectionId) {
    const tab = document.querySelector(`[data-section="${sectionId}"]`);
    tab.click();
}

// Load config on page load
document.addEventListener('DOMContentLoaded', loadConfig);
