document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab-btn');
    const totalCount = document.querySelector('.grid.grid-cols-1 .bg-white p.text-2xl.font-bold.text-\\[\\#3B82F6\\]');
    const interviewCount = document.querySelector('.grid.grid-cols-1 .bg-white:nth-child(2) p.text-2xl.font-bold.text-\\[\\#10B981\\]');
    const rejectedCount = document.querySelector('.grid.grid-cols-1 .bg-white:nth-child(3) p.text-2xl.font-bold.text-\\[\\#EF4444\\]');
    const jobsCountSpan = document.querySelector('.flex.flex-col.justify-between span.text-sm.text-gray-500.font-medium');
    const allTab = document.getElementById('all-tab');
    const interviewTab = document.getElementById('interview-tab');
    const rejectedTab = document.getElementById('rejected-tab');

    let currentTab = 'all';
    let counts = { total: 8, interview: 0, rejected: 0 };

    // Initially, all cards are in all-tab with status not-applied
    let jobCards = Array.from(allTab.querySelectorAll('.bg-white'));
    jobCards.forEach((card, index) => {
        card.setAttribute('data-id', index + 1);
        card.setAttribute('data-status', 'not-applied');
    });

    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.getAttribute('data-tab');
            
            // Hide all tab contents
            document.querySelectorAll('.tab-content').forEach(content => content.style.display = 'none');
            
            // Show the selected tab
            document.getElementById(tabName + '-tab').style.display = 'block';
            
            // Update active tab button
            tabs.forEach(t => {
                t.classList.remove('bg-[#3B82F6]', 'text-white');
                t.classList.add('bg-white', 'text-gray-600', 'border', 'border-gray-200', 'hover:bg-gray-50');
            });
            tab.classList.remove('bg-white', 'text-gray-600', 'border', 'border-gray-200', 'hover:bg-gray-50');
            tab.classList.add('bg-[#3B82F6]', 'text-white');
            
            currentTab = tabName;
            updateJobsCount();
        });
    });

    
    jobCards.forEach(card => {
        const interviewBtn = card.querySelector('button.border-\\[\\#10B981\\]');
        const rejectedBtn = card.querySelector('button.border-\\[\\#EF4444\\]');
        const deleteBtn = card.querySelector('button.absolute');

        interviewBtn.addEventListener('click', () => {
            const currentStatus = card.getAttribute('data-status');
            if (currentStatus === 'interview') {
                setStatus(card, 'not-applied');
                moveCard(card, 'all');
            } else {
                setStatus(card, 'interview');
                moveCard(card, 'interview');
            }
            updateCounts();
            updateJobsCount();
        });

        rejectedBtn.addEventListener('click', () => {
            const currentStatus = card.getAttribute('data-status');
            if (currentStatus === 'rejected') {
                setStatus(card, 'not-applied');
                moveCard(card, 'all');
            } else {
                setStatus(card, 'rejected');
                moveCard(card, 'rejected');
            }
            updateCounts();
            updateJobsCount();
        });

        deleteBtn.addEventListener('click', () => {
            card.remove();
            updateCounts();
            updateJobsCount();
        });
    });

    function setStatus(card, status) {
        card.setAttribute('data-status', status);
        const statusSpan = card.querySelector('span.inline-block');
        const interviewBtn = card.querySelector('button.border-\\[\\#10B981\\]');
        const rejectedBtn = card.querySelector('button.border-\\[\\#EF4444\\]');
        
        // Reset button styles
        interviewBtn.className = 'w-full sm:w-auto px-3 sm:px-4 py-1.5 border border-[#10B981] text-[#10B981] text-xs font-bold rounded uppercase tracking-wider hover:bg-emerald-50 transition-colors';
        rejectedBtn.className = 'w-full sm:w-auto px-3 sm:px-4 py-1.5 border border-[#EF4444] text-[#EF4444] text-xs font-bold rounded uppercase tracking-wider hover:bg-red-50 transition-colors';
        
        if (status === 'interview') {
            statusSpan.textContent = 'INTERVIEW';
            statusSpan.className = 'inline-block px-2.5 py-1 bg-[#D1FAE5] text-[#10B981] text-xs font-bold tracking-wide rounded mb-4';
            // Highlight interview button
            interviewBtn.className = 'w-full sm:w-auto px-3 sm:px-4 py-1.5 bg-[#10B981] text-white text-xs font-bold rounded uppercase tracking-wider transition-colors';
        } else if (status === 'rejected') {
            statusSpan.textContent = 'REJECTED';
            statusSpan.className = 'inline-block px-2.5 py-1 bg-[#FEE2E2] text-[#EF4444] text-xs font-bold tracking-wide rounded mb-4';
            // Highlight rejected button
            rejectedBtn.className = 'w-full sm:w-auto px-3 sm:px-4 py-1.5 bg-[#EF4444] text-white text-xs font-bold rounded uppercase tracking-wider transition-colors';
        } else {
            statusSpan.textContent = 'NOT APPLIED';
            statusSpan.className = 'inline-block px-2.5 py-1 bg-[#EFF6FF] text-[#3B82F6] text-xs font-bold tracking-wide rounded mb-4';
        }
    }

    function moveCard(card, tab) {
        card.remove();
        if (tab === 'all') {
            allTab.appendChild(card);
        } else if (tab === 'interview') {
            interviewTab.appendChild(card);
        } else if (tab === 'rejected') {
            rejectedTab.appendChild(card);
        }
    }

    function updateCounts() {
        counts.total = allTab.querySelectorAll('.bg-white').length + interviewTab.querySelectorAll('.bg-white').length + rejectedTab.querySelectorAll('.bg-white').length;
        counts.interview = interviewTab.querySelectorAll('.bg-white').length;
        counts.rejected = rejectedTab.querySelectorAll('.bg-white').length;
        totalCount.textContent = counts.total;
        interviewCount.textContent = counts.interview;
        rejectedCount.textContent = counts.rejected;
    }

    function filterCards() {
        // No longer needed
    }

    function showNoJobsMessage() {
        // No longer needed
    }

    function removeNoJobsMessage() {
        // No longer needed
    }

    function updateJobsCount() {
        let visibleCount = 0;
        if (currentTab === 'all') {
            visibleCount = allTab.querySelectorAll('.bg-white').length;
        } else if (currentTab === 'interview') {
            visibleCount = interviewTab.querySelectorAll('.bg-white').length;
        } else if (currentTab === 'rejected') {
            visibleCount = rejectedTab.querySelectorAll('.bg-white').length;
        }
        jobsCountSpan.textContent = `${visibleCount} jobs`;
    }

    updateCounts();
    updateJobsCount();
});
