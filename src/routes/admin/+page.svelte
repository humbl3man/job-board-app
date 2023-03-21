<script lang="ts">
	import { enhance } from '$app/forms';
	import Shell from '$lib/components/Shell.svelte';
	import { Role } from '$lib/constants/Role';
	import type { PageData } from './$types';

	export let data: PageData;

	$: excludeAdminUsers = data.users.filter((u) => u.role.id !== Role.ADMIN);
</script>

<!-- <pre>
  {JSON.stringify(data, null, 2)}
</pre> -->

<Shell>
	<div class="mx-auto max-w-screen-2xl my-16 bg-white px-6 py-16 rounded-md">
		<h1 class="font-bold text-3xl mb-8">Admin</h1>
		<table class="w-full text-sm text-left text-gray-500">
			<thead class="bg-gray-50">
				<tr>
					<th
						scope="col"
						class="px-6 py-3">Email</th
					>
					<th
						scope="col"
						class="px-6 py-3">Name</th
					>
					<th
						scope="col"
						class="px-6 py-3">Role</th
					>
					<th
						scope="col"
						class="px-6 py-3"
					>
						Date Created
					</th>
					<th scope="col" />
				</tr>
			</thead>

			<tbody>
				{#each excludeAdminUsers as user (user.id)}
					<tr class="bg-white border-b">
						<td class="px-6 py-4">{user.email}</td>
						<td class="px-6 py-4">{user.name || 'N/A'}</td>
						<td class="px-6 py-4">{user.role.name}</td>
						<td class="px-6 py-4">{new Date(user.createdAt).toLocaleDateString('en-us')}</td>
						<td class="px-6 py-4 flex justify-end">
							<form
								action="?/deleteuser"
								method="POST"
								use:enhance
							>
								<input
									type="hidden"
									name="userid"
									value={user.id}
								/>
								<button class="bg-red-50 text-red-900 px-5 py-1 rounded-md">Delete</button>
							</form>
						</td>
					</tr>
				{/each}
				<!-- {#each jobs as job (job.id)}
          <tr class="bg-white border-b">
            <td class="px-6 py-4">
              <div>{job.title}</div>
              {#if job.company.name === data.user?.company}
                <div
                  class="mt-1 inline-block text-xs rounded-lg py-[4px] px-[12px] leading-none bg-blue-100 text-blue-900"
                >
                  Posted by you
                </div>
              {/if}
            </td>
            <td class="px-6 py-4">{job.company.name}</td>
            <td class="px-6 py-4">{formatCurrency(job.salary)}</td>
            <td class="px-6 py-4">{job.category.name}</td>
            <td class="px-6 py-4">{new Date(job.createdAt).toLocaleDateString('en-us')}</td>
            <td class="px-6 py-4"
              ><a
                class="button-ghost block text-center w-full"
                href="/jobs/{job.id}">Details</a
              ></td
            >
          </tr>
        {/each} -->
			</tbody>
		</table>
	</div>
</Shell>
