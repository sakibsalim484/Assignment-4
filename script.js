document.addEventListener('DOMContentLoaded', () => {
    let jobCards = document.querySelectorAll('.space-y-4 > div');
    const tabs = document.querySelectorAll('.flex.items-center.gap-2 button');
    const totalCount = document.querySelector('.grid.grid-cols-1.md\\:grid-cols-3 .bg-white p.text-2xl.font-bold.text-\\[\\#3B82F6\\]');
    const interviewCount = document.querySelector('.grid.grid-cols-1.md\\:grid-cols-3 .bg-white:nth-child(2) p.text-2xl.font-bold.text-\\[\\#10B981\\]');
    const rejectedCount = document.querySelector('.grid.grid-cols-1.md\\:grid-cols-3 .bg-white:nth-child(3) p.text-2xl.font-bold.text-\\[\\#EF4444\\]');
    const jobsCountSpan = document.querySelector('.flex.flex-col.md\\:flex-row.justify-between span.text-sm.text-gray-500.font-medium');
    const jobsContainer = document.querySelector('.space-y-4');

    let currentTab = 'all';
    let counts = { total: 8, interview: 0, rejected: 0 };

    
    jobCards.forEach((card, index) => {
        card.setAttribute('data-id', index + 1);
        card.setAttribute('data-status', 'not-applied');
    });

    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            
            tabs.forEach(t => {
                t.classList.remove('bg-[#3B82F6]', 'text-white');
                t.classList.add('bg-white', 'text-gray-600', 'border', 'border-gray-200', 'hover:bg-gray-50');
            });
          
            tab.classList.remove('bg-white', 'text-gray-600', 'border', 'border-gray-200', 'hover:bg-gray-50');
            tab.classList.add('bg-[#3B82F6]', 'text-white');
            currentTab = tab.textContent.toLowerCase();
            filterCards();
            updateJobsCount();
        });
    });

    
    jobCards.forEach(card => {
        const interviewBtn = card.querySelector('div.flex.items-center.gap-3 button:nth-child(1)');
        const rejectedBtn = card.querySelector('div.flex.items-center.gap-3 button:nth-child(2)');
        const deleteBtn = card.querySelector('button.absolute');

        interviewBtn.addEventListener('click', () => {
            const currentStatus = card.getAttribute('data-status');
            if (currentStatus === 'interview') {
                setStatus(card, 'not-applied');
            } else {
                setStatus(card, 'interview');
            }
            updateCounts();
            filterCards();
            updateJobsCount();
        });

        rejectedBtn.addEventListener('click', () => {
            const currentStatus = card.getAttribute('data-status');
            if (currentStatus === 'rejected') {
                setStatus(card, 'not-applied');
            } else {
                setStatus(card, 'rejected');
            }
            updateCounts();
            filterCards();
            updateJobsCount();
        });

        deleteBtn.addEventListener('click', () => {
            card.remove();
            updateCounts();
            filterCards();
            updateJobsCount();
        });
    });

    function setStatus(card, status) {
        card.setAttribute('data-status', status);
        const statusSpan = card.querySelector('span.inline-block');
        if (status === 'interview') {
            statusSpan.textContent = 'INTERVIEW';
            statusSpan.className = 'inline-block px-2.5 py-1 bg-[#D1FAE5] text-[#10B981] text-xs font-bold tracking-wide rounded mb-4';
        } else if (status === 'rejected') {
            statusSpan.textContent = 'REJECTED';
            statusSpan.className = 'inline-block px-2.5 py-1 bg-[#FEE2E2] text-[#EF4444] text-xs font-bold tracking-wide rounded mb-4';
        } else {
            statusSpan.textContent = 'NOT APPLIED';
            statusSpan.className = 'inline-block px-2.5 py-1 bg-[#EFF6FF] text-[#3B82F6] text-xs font-bold tracking-wide rounded mb-4';
        }
    }

    function updateCounts() {
        jobCards = document.querySelectorAll('.space-y-4 > div');
        const statuses = Array.from(jobCards).map(card => card.getAttribute('data-status'));
        counts.total = statuses.length;
        counts.interview = statuses.filter(s => s === 'interview').length;
        counts.rejected = statuses.filter(s => s === 'rejected').length;
        totalCount.textContent = counts.total;
        interviewCount.textContent = counts.interview;
        rejectedCount.textContent = counts.rejected;
    }

    function filterCards() {
        jobCards = document.querySelectorAll('.space-y-4 > div');
        jobCards.forEach(card => {
            const status = card.getAttribute('data-status');
            if (currentTab === 'all') {
                card.style.display = 'block';
            } else if (currentTab === status) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
       
        const visibleCards = Array.from(jobCards).filter(card => card.style.display !== 'none');
        if (visibleCards.length === 0 && currentTab !== 'all') {
            showNoJobsMessage();
        } else {
            removeNoJobsMessage();
        }
    }

    function showNoJobsMessage() {
        removeNoJobsMessage(); 
        const message = document.createElement('div');
        message.className = 'bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center';
        message.innerHTML = `
            <div class="mb-4">
                <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            </div>
            <h3 class="text-lg font-medium text-gray-900 mb-2">No jobs available</h3>
            <p class="text-sm text-gray-500">There are no jobs in this category yet.</p>
        `;
        message.id = 'no-jobs-message';
        jobsContainer.appendChild(message);
    }

    function removeNoJobsMessage() {
        const message = document.getElementById('no-jobs-message');
        if (message) message.remove();
    }

    function updateJobsCount() {
        jobCards = document.querySelectorAll('.space-y-4 > div');
        const visibleCards = Array.from(jobCards).filter(card => card.style.display !== 'none');
        jobsCountSpan.textContent = `${visibleCards.length} jobs`;
    }

   
    updateCounts();
    filterCards();
    updateJobsCount();
});
