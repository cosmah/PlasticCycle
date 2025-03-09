<!DOCTYPE html>
<html>
<head>
    <title>Recycling Report - {{ $businessName }}</title>
    <style>
        body { font-family: Arial, sans-serif; }
        table { width: 100%; border-collapse: collapse; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
    </style>
</head>
<body>
    <h1>Recycling Report for {{ $businessName }}</h1>
    <p>Generated on: {{ $generatedAt }}</p>
    <p>Total Recycled: {{ $totalRecycled }} kg</p>

    <h2>Recycling Records</h2>
    <table>
        <thead>
            <tr>
                <th>Date Processed</th>
                <th>Plastic Type</th>
                <th>Quantity (kg)</th>
                <th>Compliance Notes</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($records as $record)
                <tr>
                    <td>{{ $record->processed_at->toDateString() }}</td>
                    <td>{{ $record->pickupRequest->plastic_type }}</td>
                    <td>{{ $record->quantity }}</td>
                    <td>{{ $record->pickupRequest->compliance_notes ?? 'N/A' }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
</body>
</html>